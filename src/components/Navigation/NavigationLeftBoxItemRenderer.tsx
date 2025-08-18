import { NavigationLeftBoxItem } from "./Navigation.styles"

export const NavigationLeftBoxItemRenderer = (text: string) => {
  return (
    <NavigationLeftBoxItem variant="h6" component="span">
      {text}
    </NavigationLeftBoxItem>
)}

export default NavigationLeftBoxItemRenderer;