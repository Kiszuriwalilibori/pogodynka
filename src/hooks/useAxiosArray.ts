import axios from "axios";

import { useState, useEffect, useCallback } from "react";
import { useSnackbar } from "notistack";

import { useBoolean } from "hooks";
import { FavoriteItemWeatherWithEndpointLabel } from "types";

type endpoints = {
  label: string;
  url: string;
}[];

const useAxiosArray = (endpoints: endpoints, validator: Function) => {
  const [data, setData] = useState<{ data: FavoriteItemWeatherWithEndpointLabel[] }>(
    {} as { data: FavoriteItemWeatherWithEndpointLabel[] }
  );
  const [error, setErrorTrue, ,] = useBoolean(false);
  const [loading, , setLoadingFalse] = useBoolean(true);
  const { enqueueSnackbar } = useSnackbar();

  let favoritesWeatherData = { data: [] as FavoriteItemWeatherWithEndpointLabel[] };

  const fatalError = useCallback(() => {
    setErrorTrue();
    enqueueSnackbar(`No data fetched at all for favorites`, {
      variant: "error",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theEndOfRecursiveFetchLoopHandle = useCallback(() => {
    setLoadingFalse();

    if (favoritesWeatherData.data.length) {
      setData(favoritesWeatherData);
    } else {
      fatalError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async (favorites: endpoints) => {
    if (favorites.length) {
      let singleFavorite = favorites.shift()!;
      let reducedFavorites = [...favorites];

      axios
        .get(singleFavorite.url)
        .then(data => {
          const weatherData: FavoriteItemWeatherWithEndpointLabel = { ...data?.data };
          if (validator(weatherData)) {
            if (singleFavorite) weatherData.endpointLabel = singleFavorite?.label; // funny name but also hardly repeatble by accident
            favoritesWeatherData.data.push(weatherData);
            if (reducedFavorites.length) {
              fetchData(reducedFavorites);
            } else {
              theEndOfRecursiveFetchLoopHandle();
            }
          } else {
            setLoadingFalse();
            const label = singleFavorite.label ? singleFavorite.label : "unknown location";
            enqueueSnackbar(`Data for ${label} was broken, corrupted or otherwise invalid`, {
              variant: "warning",
            });
          }
        })
        .catch(err => {
          let code = err.response ? err.response.status : err;
          enqueueSnackbar(`Error ${code} encountered when fetching data for ${singleFavorite.label}`, {
            variant: "warning",
          });
          if (reducedFavorites.length) {
            fetchData(reducedFavorites);
          } else {
            theEndOfRecursiveFetchLoopHandle();
          }
        });
    } else {
      setErrorTrue();
      enqueueSnackbar(`Thre are no favorites in local storage or passed empty array of URL due to unknown error`, {
        variant: "error",
      });
    }
  };
  useEffect(() => {
    fetchData(endpoints);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, loading };
};

export default useAxiosArray;
