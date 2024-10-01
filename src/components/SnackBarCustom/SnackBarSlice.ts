import { SnackbarProps } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: {
    message: "success",
    open: false,
    autoHideDuration: 4000,
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    status: "success",
  } as SnackbarProps & { status: 'success' | 'error' },
  reducers: {
    showSnackbar: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.status = action.payload.status || "success";
    },
    hideSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
