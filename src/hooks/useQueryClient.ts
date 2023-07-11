import { QueryClient } from "@tanstack/react-query";
// import { AxiosError } from "axios";
// import useDispatchAction from "./useDispatchAction";
// import { useDispatch } from "react-redux";

const useQueryClient = () => {
  // const { showErrorMessage } = useDispatchAction();
  // const dispatch = useDispatch();
  // const queryErrorHandler = (err: unknown): void => {
  //   // const axiosError = err as AxiosError;
  // };

  const defaultQueryClientOptions = {
    queries: {
      // onError: queryErrorHandler,
      retry: false,
      cacheTime: 1.1 * (60 * 1000),
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: 1 * (60 * 1000),
      refetchInterval: 1 * (60 * 1000),
    },
  };

  return new QueryClient({
    defaultOptions: defaultQueryClientOptions,
  });
};

export default useQueryClient;
