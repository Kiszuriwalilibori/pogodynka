import Typography from "@mui/material/Typography";

interface Props {
  textContent: string;
}

const ShortDescription = (props: Props) => {
  const { textContent } = props;

  return (
    <Typography variant="h2Bordered" component="h2" sx={{ textAlign: "center", margin: "0 auto" }}>
      {textContent}
    </Typography>
  );
};

export default ShortDescription;
