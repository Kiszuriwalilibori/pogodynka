interface RenderCondition {
  shouldRender: boolean;
}

function renderConditionally(Component: React.ComponentType<RenderCondition | any>) {
  return function (props: RenderCondition | any) {
    let { shouldRender, ...newProps } = props;
    return props.shouldRender ? <Component {...newProps} /> : null;
  };
}

export default renderConditionally;
