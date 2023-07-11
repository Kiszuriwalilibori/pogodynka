import { Fade } from "@mui/material";

function withFade<T>(Component: React.ComponentType<React.PropsWithChildren<T>>) {
  return (props: React.PropsWithChildren<T>) => (
    <Fade in={true} timeout={400}>
      <Component {...props} />
    </Fade>
  );
}
export default withFade;
