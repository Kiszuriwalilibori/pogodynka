import React from "react";
import { t } from "i18next";
import { TextField } from "@mui/material";
import { FieldInputProps } from "formik/dist/types";
import { withFade } from "HOCs";

import { Tooltip, SubmitButton } from "components";

interface Props {
  cls: string | undefined;
  handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  fieldProps: FieldInputProps<any>;
}

const Form = React.forwardRef((props: Props, ref: React.LegacyRef<HTMLFormElement> | undefined) => {
  const { cls, handleSubmit, fieldProps } = props;

  return (
    <form className={cls} autoComplete="off" onSubmit={handleSubmit} ref={ref}>
      <Tooltip title={t("msgs.two_and_alpha")} arrow>
        <TextField required id="favorite_name_input" size="small" label="Etykieta" variant="outlined" {...fieldProps} />
      </Tooltip>
      <SubmitButton text={t("buttons.save")} />
    </form>
  );
});

export default withFade(Form);
// todo iść tym śladem z withFade
