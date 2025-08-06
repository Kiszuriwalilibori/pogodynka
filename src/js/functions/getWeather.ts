import axios, { AxiosError } from "axios";
import { showErrorMessage } from "../Redux/actionCreators";

interface WeatherData {
         
}

interface WeatherError {
  message?: string;
  error?: string;
  code?: number;
}

export default async function getWeather(url: string): Promise<WeatherData | undefined> {
  try {
    const response = await axios.get<WeatherData>(url);
    
    if (!response.data) {
      throw new Error('No data received from weather API');
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<WeatherError>;
      
      if (axiosError.response) {
        // Server responded with error status
        const errorMessage = axiosError.response.data?.message || 
                           axiosError.response.data?.error || 
                           axiosError.response.statusText;
        showErrorMessage(`Server error: ${errorMessage}`);
      } else if (axiosError.request) {
        // Request made but no response
        showErrorMessage('No response from weather API');
      } else {
        // Error in setting up the request
        showErrorMessage('Error creating request to weather API');
      }
    } else {
      // Non-axios error
      showErrorMessage('Error fetching weather data');
    }

    console.error('Weather API error:', error);
    return undefined;
  }
}
