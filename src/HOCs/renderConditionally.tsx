interface RenderCondition {
  renderCondition: boolean;
}

function renderConditionally(Component: React.ComponentType<RenderCondition | any>) {
  return function (props: RenderCondition | any) {
    let { renderCondition, ...newProps } = props;
    return props.renderCondition ? <Component {...newProps} /> : null;
  };
}

export default renderConditionally;
