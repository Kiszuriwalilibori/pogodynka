import { usePlaceContext } from "contexts";
import{ NavigationLeftBoxItem} from "./Navigation.styles";

export const Place = () => {
   const { label } = usePlaceContext().place;
    return (
        <NavigationLeftBoxItem variant="h6" component="span">
            {label}
        </NavigationLeftBoxItem>
    );
};

export default Place;
