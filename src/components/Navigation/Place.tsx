import { usePlaceContext } from "contexts";
import{ NavigationPlace} from "./Navigation.styles";

export const Place = () => {
   const { label } = usePlaceContext().place;
    return (
        <NavigationPlace variant="h6" component="span">
            {label}
        </NavigationPlace>
    );
};

export default Place;
