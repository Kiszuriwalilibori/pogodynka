import Tab from "@mui/material/Tab";
import { a11yProps } from "./utils";
import { useTranslation } from "react-i18next";

const TAB = "Tab ";
const tabSX = {
  "&:focus": {
    outline: "none !important",
    border: "3px solid #ffcf10",
  },
};



interface Props {
  index:number;
  title:string;
  disabled?: boolean;
}

export const TabComponent = (props: Props) => {
  const { index, title, disabled } = props;
  const { t } = useTranslation();


  return (
    <Tab
      sx={tabSX}
      label={t("tabs"+title)}
      {...a11yProps(index)}
      tabIndex={index}
      disabled={disabled}
      disableFocusRipple
      id={TAB + t("tabs"+title)}
    />
  );
};
export default TabComponent;
