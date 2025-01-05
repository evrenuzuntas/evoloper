import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

interface LoadingState {
  isLoading: boolean;
  loadingText?: string;
}

interface UiState {
  snackbar: SnackbarState;
  loading: LoadingState;
  isDarkMode: boolean;
}

const initialState: UiState = {
  snackbar: {
    open: false,
    message: "",
    severity: "info",
  },
  loading: {
    isLoading: false,
    loadingText: "",
  },
  isDarkMode: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<Omit<SnackbarState, "open">>) => {
      state.snackbar = {
        ...action.payload,
        open: true,
      };
    },
    hideSnackbar: (state) => {
      state.snackbar.open = false;
    },
    setLoading: (state, action: PayloadAction<LoadingState>) => {
      state.loading = action.payload;
    },
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { showSnackbar, hideSnackbar, setLoading, toggleDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
