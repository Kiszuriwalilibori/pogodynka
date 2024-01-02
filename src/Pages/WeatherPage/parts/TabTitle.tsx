import Typography from "@mui/material/Typography";

interface Props {
  title: string;
}

const typographySx = { textAlign: "center", margin: "0 auto" };

const TabTitle = (props: Props) => {
  const { title } = props;

  return (
    <Typography variant="h2Bordered" component="h2" sx={typographySx}>
      {title}
    </Typography>
  );
};

export default TabTitle;
