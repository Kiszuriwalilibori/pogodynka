import { SnackbarProviderProps } from "notistack";

// Type that only includes the optional props from SnackbarProviderProps
export type SnackbarConfig = Omit<SnackbarProviderProps, 'children'>;

export const snackbarConfig: SnackbarConfig = {
  preventDuplicate: true,
  maxSnack: 3,
  anchorOrigin: {
    vertical: "bottom" as const,
    horizontal: "center" as const,
  },
  autoHideDuration: 5000,
  resumeHideDuration: 1000,
};
