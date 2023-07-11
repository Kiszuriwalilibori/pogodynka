type Props = {
  // description: { label: string; text: string };
  description: string;
  cls: string;
  textContent: string;
};
/**
 * Displays value and name of single weather item
 * @param description name of weather item
 * @param cls class the component should take
 * @param textContent text to be displayed consisting of properly formatted weather param
 * @returns component that renders value and name of single weather item
 */
const Cell = (props: Props): JSX.Element => {
  const { description, cls, textContent } = props;
  return (
    <div className={cls}>
      <p>{description}</p>
      <span>{textContent}</span>
    </div>
  );
};
export default Cell;
