import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { FC } from "react";

import useQueryClient from "../hooks/useQueryClient";

const TanstackQueryProviderComponent: FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export const TanstackQueryProvider = React.memo(TanstackQueryProviderComponent);
export default TanstackQueryProvider;
