import { enqueueSnackbar } from "notistack";

export function showMessage(msg: string, variant: any = "default") {
  enqueueSnackbar(msg, {
    variant,
    TransitionProps: {
      direction: "down",
    },
    anchorOrigin: { horizontal: "center", vertical: "top" },
    autoHideDuration: 1000,
  });
}
