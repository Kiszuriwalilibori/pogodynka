import * as Yup from "yup";

import { useFormik } from "formik";

import { NotValidated } from "../details";
import { useFormStyles } from "styles/useFormStyles";
import { usePlaceContext } from "contexts";
import { useFavorites } from "hooks";

import Form from "./Form";

interface Props {
  handleFavoritesStored: Function;
}
const FavoriteLabelForm = (props: Props) => {
  const { handleFavoritesStored } = props;

  const {
    place: { type, place },
  } = usePlaceContext();

  const classes = useFormStyles();

  const { Favorites } = useFavorites();

  const {
    values: { label },
    handleSubmit,
    submitCount,
    getFieldProps,
    errors,
  } = useFormik({
    initialValues: {
      label: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object().shape({
      label: Yup.string()
        .min(2, "Za krótki ciąg - muszą być conajmniej 2 znaki")
        .required("Wpisanie etykiety jest wymagane")
        .matches(/\d|[A-z]/, "Dopuszczalne wyłącznie litery i cyfry")
        .test(
          "alreadyTaken",
          "Ta etykieta jest już użyta",

          label => !Favorites.placeAlreadyStored(label)
        ),
    }),
    onSubmit() {
      Favorites.add(label, {
        category: "place",
        label: label,
        source: type,
        place: place,
      }) && handleFavoritesStored();
    },
  });

  return (
    <>
      <Form cls={classes.root} fieldProps={getFieldProps("label")} handleSubmit={handleSubmit} />
      {submitCount > 0 && errors?.label && <NotValidated message={JSON.stringify(errors, null, 2)} />}
    </>
  );
};

export default FavoriteLabelForm;
