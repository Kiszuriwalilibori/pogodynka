import Progress from "@mui/material/CircularProgress";
import { LoaderContainer } from "./Loader.styles";

/**
 * creates a spinner that indicates loading state
 * @returns spinner component with proper ARIA attributes
 */
const Loader = () => {
  return (
    <LoaderContainer role="status" aria-label="Loading content">
      <Progress 
        color="info" 
        thickness={5} 
        size={100} 
        role="progressbar"
        aria-valuetext="Loading..."
      />
    </LoaderContainer>
  );
};

export default Loader;
