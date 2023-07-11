import Progress from "@mui/material/CircularProgress";

import { memo } from "react";

import { LoaderContainer } from "styles/styled";

/**
 * creates memoised spinner that indicates loading state
 * @returns spinner component
 */
const Loader = memo(() => {
    return (
        <LoaderContainer>
            <Progress color={"info"} thickness={5} size={100} />
        </LoaderContainer>
    );
});

export default Loader;
