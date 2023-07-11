import { Fade, TextField } from "@mui/material";
import { t } from "i18next";
import { FieldInputProps } from "formik/dist/types";
import { Tooltip, SubmitButton } from "components";

interface Props {
  cls: string | undefined;
  handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  fieldPropsLatitude: FieldInputProps<number>;
  fieldPropsLongitude: FieldInputProps<number>;
}

const Form = (props: Props) => {
  const { cls, handleSubmit, fieldPropsLatitude, fieldPropsLongitude } = props;

  return (
    <Fade in={true} timeout={400}>
      <form className={cls} id="search__form" autoComplete="off" onSubmit={handleSubmit}>
        <Tooltip title={t("search.longitude")} arrow>
          <TextField required size="small" variant="outlined" label="Latitude" id="Latitude" {...fieldPropsLatitude} />
        </Tooltip>
        <Tooltip title={t("search.latitude")} arrow>
          <TextField
            required
            size="small"
            variant="outlined"
            label="Longitude"
            id="Longitude"
            {...fieldPropsLongitude}
          />
        </Tooltip>
        <SubmitButton text={t("search.search")} />
      </form>
    </Fade>
  );
};

export default Form;
