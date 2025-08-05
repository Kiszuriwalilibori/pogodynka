import { /*useCallback,*/ /*useRef,*/ useState } from "react";
import { Fade, /*IconButton,*/ TextField } from "@mui/material";
// import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { FieldInputProps } from "formik/dist/types";
import { useTranslation } from "react-i18next";
import { useSpeechRecognition } from "react-speech-kit";

import { Tooltip, SubmitButton } from "components";
import { TIMEOUT_LONG } from "fixtures";
// import { listeningMicrophoneSx, microphoneSx } from "./Form.styles";
// import useManageTextField from "hooks/useManageTextField";

interface Props {
  formClassName: string | undefined;
  handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  fieldProps: FieldInputProps<any>;
}

const Form = (props: Props) => {
  const { formClassName, handleSubmit, fieldProps } = props;
  // const textFieldRef = useRef<HTMLInputElement | null>(null);
  const [/*told*/, setTold] = useState<string>("");

  const { /*listen, listening, stop, supported */} = useSpeechRecognition({
    onResult: (result: string) => {
      if (result) setTold(result);
      // console.log(
      //   " textFieldRef, textFieldRef.current,result, textFieldRef.current.value",
      //   textFieldRef,
      //   textFieldRef.current,
      //   result,
      //   textFieldRef.current ? textFieldRef.current.value : "nothing"
      // );
    },
  });

  // const handleClickMicrophone = useCallback(() => {
  //   listening ? stop() : listen();
  // }, [listening, listen, stop]);

  const { t } = useTranslation();

  return (
    <Fade in={true} timeout={TIMEOUT_LONG}>
      <form className={formClassName} autoComplete="off" onSubmit={handleSubmit}>
        <Tooltip title={t("msgs.two_and_alpha")} arrow>
          <TextField
            // inputRef={textFieldRef}
            required
            id="city_name_input"
            size="small"
            label={t("page-weather.add_place")}
            variant="outlined"
            {...fieldProps}
            // value={told ? told : ""}
            // onChange={e => {
            //   setTold(e.target.value);
            // }}
          />
        </Tooltip>
        {/* <IconButton
          disabled={!supported}
          onClick={handleClickMicrophone}
          sx={{ ...microphoneSx, ...listeningMicrophoneSx(listening) }}
        >
          <KeyboardVoiceIcon />
        </IconButton> */}
        <SubmitButton text={t("search.search")} />
      </form>
    </Fade>
  );
};

export default Form;
