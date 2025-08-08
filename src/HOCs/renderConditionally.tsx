interface RenderCondition {
  shouldRender: boolean;
}

const renderConditionally = (Component: React.ComponentType<RenderCondition | any>) => {
  return (props: RenderCondition | any) => {
    const { shouldRender, ...newProps } = props;
    return props.shouldRender ? <Component {...newProps} /> : null;
  };
};

export default renderConditionally;
