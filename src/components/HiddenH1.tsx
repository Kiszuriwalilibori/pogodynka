import React from "react";
import { FC } from "react";

type Props = {
  headingText: string;
}

const HiddenH1Component: FC<Props> = (props) => {
  const { headingText: text } = props;
  return (
    <header>
      <h1 className="sr-only">{text}</h1>
    </header>
  );
};

export const HiddenH1 = React.memo(HiddenH1Component);
export default HiddenH1;
