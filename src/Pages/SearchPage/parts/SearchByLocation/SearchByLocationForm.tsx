import { Fade, TextField } from "@mui/material";
import { t } from "i18next";
import { FieldInputProps } from "formik/dist/types";
import { Tooltip, SubmitButton } from "components";
import { TIMEOUT_SHORT } from "fixtures";
import { StyledForm } from "styles/Common.styles";

interface Props {
  handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  fieldPropsLatitude: FieldInputProps<number>;
  fieldPropsLongitude: FieldInputProps<number>;
}

const SearchByLocationForm = (props: Props) => {
  const { handleSubmit, fieldPropsLatitude, fieldPropsLongitude } = props;

  return (
    <Fade in={true} timeout={TIMEOUT_SHORT}>
      <StyledForm id="search__form" autoComplete="off" onSubmit={handleSubmit}>
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
      </StyledForm>
    </Fade>
  );
};

export default SearchByLocationForm;
