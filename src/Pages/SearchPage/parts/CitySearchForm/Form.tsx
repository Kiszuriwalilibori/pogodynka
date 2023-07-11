import { Fade, TextField } from "@mui/material";
import { FieldInputProps } from "formik/dist/types";
import { useTranslation } from "react-i18next";
import { Tooltip, SubmitButton } from "components";

interface Props {
  cls: string | undefined;
  handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  fieldProps: FieldInputProps<any>;
}

const Form = (props: Props) => {
  const { cls, handleSubmit, fieldProps } = props;
  const { t } = useTranslation();
  return (
    <Fade in={true} timeout={1000}>
      <form className={cls} autoComplete="off" onSubmit={handleSubmit}>
        <Tooltip title={t("msgs.two_and_alpha")} arrow>
          <TextField
            required
            id="city_name_input"
            size="small"
            label="Miejscowość"
            variant="outlined"
            {...fieldProps}
          />
        </Tooltip>
        <SubmitButton text={t("search.search")} />
      </form>
    </Fade>
  );
};

export default Form;
