type Props = {
  description: string;
  cellClassName: string;
  text: string;
};
/**
 * Displays value and name of single weather item
 * @param description name of weather item
 * @param cellClassName class the component should take
 * @param textContent text to be displayed consisting of properly formatted weather param
 * @returns component that renders value and name of single weather item
 */
const Cell = (props: Props): JSX.Element => {
  const { description, cellClassName, text } = props;
  return (
    <div className={cellClassName}>
      <p>{description}</p>
      <span>{text}</span>
    </div>
  );
};
export default Cell;
