import { usePlaceContext } from "contexts";
import { ReactElement } from "react";

interface Props {
    renderer: (text: string) => ReactElement;
}

export const Place = (props: Props) => {
    const { renderer } = props;
    const { label } = usePlaceContext().place;
    
    if (!label) return null;
    
    return renderer(label);
};

export default Place;
