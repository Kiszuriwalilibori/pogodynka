import * as React from "react";
import { connect } from "react-redux";

import { fetchBackgroundImage_Thunk } from "../js/Redux/fetchBackgroundImageThunk";
import { ExtendedThunkDispatch } from "types";
import { showErrorMessage } from "js/Redux/actionCreators";
import { useMessage } from "hooks";

type Props = {
  children: React.ReactNode;
  fetchBackgroundImage: () => void;
};

const SetBackground = ({ fetchBackgroundImage, children }: Props) => {
  const showMessage = useMessage();
  React.useEffect(() => {
    if (!process.env.REACT_APP_UNSPLASH_ACCESS_KEY) {
      showMessage.warning(
        "No Unsplash access key available. The app will work with standard and not customizable background only"
      );
    }
    fetchBackgroundImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};

const mapDispatchToProps = (dispatch: ExtendedThunkDispatch<ReturnType<typeof showErrorMessage>>) => ({
  fetchBackgroundImage: () => dispatch(fetchBackgroundImage_Thunk()),
});

export default connect(null, mapDispatchToProps)(SetBackground as React.FC);
