import React from "react";
import { TextField } from "@mui/material";
import { FieldInputProps } from "formik/dist/types";
import { withFade } from "HOCs";

import { Tooltip, SubmitButton } from "components";
import { useTranslation } from "react-i18next";
import { StyledForm } from "styles/Common.styles";

interface Props {
  handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  fieldProps: FieldInputProps<any>;
}

const Form = React.forwardRef((props: Props, ref: React.LegacyRef<HTMLFormElement> | undefined) => {
  const { handleSubmit, fieldProps } = props;
  const { t } = useTranslation();
  return (
    <StyledForm autoComplete="off" onSubmit={handleSubmit} ref={ref}>
      <Tooltip title={t("msgs.two_and_alpha")} arrow>
        <TextField
          required
          id="favorite_name_input"
          size="small"
          label={t("page-weather.label")}
          variant="outlined"
          {...fieldProps}
        />
      </Tooltip>
      <SubmitButton text={t("buttons.save")} />
    </StyledForm>
  );
});

export default withFade(Form);
