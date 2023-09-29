import Progress from "@mui/material/CircularProgress";
import { LoaderContainer } from "./styled";

/**
 * creates  spinner that indicates loading state
 * @returns spinner component
 */
const Loader = () => {
  return (
    <LoaderContainer>
      <Progress color={"info"} thickness={5} size={100} />
    </LoaderContainer>
  );
};

export default Loader;
