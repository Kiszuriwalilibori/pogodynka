import * as Yup from "yup";

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Form from "./Form";

import { NotValidated } from "components";
import { useFormStyles } from "styles/useFormStyles";
import { Place } from "js/functions";
import { usePlaceContext } from "contexts";
import { PlaceVariants, PlaceType } from "types";
import { useDispatchAction } from "hooks";

const CitySearchForm = () => {
  const classes = useFormStyles();
  const placeContext = usePlaceContext();
  const { clearSearchFactory } = useDispatchAction();
  let navigate = useNavigate();
  const { t } = useTranslation();
  const {
    values: { city },
    handleSubmit,
    submitCount,
    getFieldProps,
    errors,
  } = useFormik({
    initialValues: {
      city: "",
    },
    validationSchema: Yup.object().shape({
      city: Yup.string()
        .min(2, t("msgs.too_short") as any)
        .required(t("msgs.name_requested") as any)
        .matches(/\d|[A-z]/, t("msgs.chars&nums_only") as any),
    }),
    onSubmit() {
      const place: PlaceType = new Place(PlaceVariants.CITY, city);
      placeContext.setPlace(place);
      navigate(place.redirectURL, { state: { results: place.redirectURL } });

      clearSearchFactory();
    },
  });

  return (
    <>
      <Form cls={classes.root} handleSubmit={handleSubmit} fieldProps={getFieldProps(PlaceVariants.CITY)} />
      {submitCount > 0 && errors?.city && <NotValidated message={JSON.stringify(errors, null, 2)} />}
    </>
  );
};

export default CitySearchForm;
