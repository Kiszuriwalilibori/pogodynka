import * as Yup from "yup";

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { NotValidated } from "components";
import { Place } from "js/functions";
import { usePlaceContext } from "contexts";
import { PlaceVariants } from "types";
import { useDispatchAction } from "hooks";

import SearchByLocationForm from "./SearchByLocationForm";
import { t } from "i18next";

const SearchByLocation = () => {
  const placeContext = usePlaceContext();

  const { clearSearchFactory } = useDispatchAction();

  let navigate = useNavigate();

  const {
    values: { latitude, longitude },
    handleSubmit,
    submitCount,
    getFieldProps,
    errors,
  } = useFormik({
    initialValues: {
      latitude: "",
      longitude: "",
    },
    validateOnChange: true,
    validateOnBlur: false,
    validationSchema: Yup.object().shape({
      latitude: Yup.string()
        .required(t("search.long_required") as any)
        .test("latitude_isNaN", t("search.latitude_isNaN") as any, latitude => {
          return !isNaN(Number(latitude));
        })
        .test(
          "latitude_OutOFRange",
          t("search.latitude_OutOFRange") as any,
          latitude => !(Number(latitude) < -90 || Number(latitude) > 90)
        ),
      longitude: Yup.string()
        .required(t("search.lat_required") as any)
        .test("longitude_isNaN", t("search.longitude_isNaN") as any, longitude => {
          return !isNaN(Number(longitude));
        })
        .test(
          "longitude_OutOFRange",
          t("search.longitude_OutOFRange") as any,
          longitude => !(Number(longitude) < -180 || Number(longitude) > 180)
        ),
    }),
    onSubmit() {
      const place = new Place(PlaceVariants.LOCATION, {
        latitude: Number(latitude),
        longitude: Number(longitude),
      });
      placeContext.setPlace(place);
      navigate(place.redirectURL, { state: { results: place.redirectURL } });
      clearSearchFactory();
    },
  });

  return (
    <>
      <SearchByLocationForm
        handleSubmit={handleSubmit}
        fieldPropsLongitude={getFieldProps("longitude")}
        fieldPropsLatitude={getFieldProps("latitude")}
      />

      {submitCount > 0 && (errors?.latitude || errors?.longitude) && (
        <NotValidated
          message={`${errors?.latitude ? latitude : ""}  ${errors?.longitude ? longitude : ""}. ${JSON.stringify(
            errors,
            null,
            2
          )}`}
        />
      )}
    </>
  );
};

export default SearchByLocation;
