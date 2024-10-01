import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/store";
import { hideSnackbar } from "./SnackBarSlice";

const SnackBarCustom = () => {
    const dispatch = useDispatch();
    const { open, message, status, autoHideDuration, anchorOrigin } = useSelector((state: RootState) => state.snackbar);

    const handleClose = () => {
        dispatch(hideSnackbar());
    };
    
    return (
        <Snackbar
            open={open} autoHideDuration={autoHideDuration} anchorOrigin={anchorOrigin} onClose={handleClose}
        >
            <Alert
                severity={status}
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}
export default SnackBarCustom