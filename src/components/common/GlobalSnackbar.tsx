import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { hideSnackbar } from "../../store/slices/uiSlice";

const GlobalSnackbar = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((state: RootState) => state.ui.snackbar);

  const handleClose = () => {
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
      <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
