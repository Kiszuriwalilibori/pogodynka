import { TextField as Field, TextFieldProps } from "@mui/material";
import { FieldInputProps } from "formik/dist/types";

type Defaults = Pick<TextFieldProps, "size" | "variant" | "required">;

const TextField = (props: Partial<TextFieldProps> & { fieldProps: FieldInputProps<any> }) => {
  const defaults: Defaults = { size: "small", variant: "outlined", required: true };

  const allProps = { ...defaults, ...props };

  return <Field {...allProps} />;
};

export default TextField;
