import Typography from "@mui/material/Typography";

interface Props {
  title: string;
}

const TabTitle = (props: Props) => {
  const { title } = props;

  return (
    <Typography variant="h2Bordered" component="h2" sx={{ textAlign: "center", margin: "0 auto" }}>
      {title}
    </Typography>
  );
};

export default TabTitle;
