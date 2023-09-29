import React from "react";

interface Props {
  headingText: string;
}

export const HiddenH1 = (props: Props) => {
  const { headingText: text } = props;
  return (
    <header>
      <h1 className="sr-only">{text}</h1>
    </header>
  );
};

export default HiddenH1;
