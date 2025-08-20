import axios from "axios";

interface WeatherData {
  // Add your weather data interface here
}

interface WeatherError {
  message?: string;
  error?: string;
  code?: number;
}

export default async function getWeather(url: string): Promise<WeatherData | null> {
  try {
    const response = await axios.get<WeatherData>(url);
    
    if (!response.data) {
      throw new Error('No data received from weather API');
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<WeatherError>(error)) {
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.message || 
                           error.response.data?.error || 
                           error.response.statusText;
        throw new Error(errorMessage || 'Failed to fetch weather data');
      } else if (error.request) {
        // Request made but no response
        throw new Error('No response from weather API');
      }
    }
    
    // For any other errors, rethrow them
    throw error instanceof Error ? error : new Error('Error fetching weather data');
  }
}
