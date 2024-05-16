import { Alert, dividerClasses, Snackbar, SnackbarProps } from "@mui/material"
import { useContext } from "react";
import SnackBarContext from "~/contexts/SnackBarContext";

const SnackBarCustom = () => {
    const { setSnackBar, snackBar } = useContext(SnackBarContext)
    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBar({
            ...snackBar,
            open: false
        });
    };
    return (
        <Snackbar
            open={snackBar.open} autoHideDuration={snackBar.autoHideDuration} anchorOrigin={snackBar.anchorOrigin} onClose={handleClose}
        >
            <Alert
                severity={snackBar.status}
                sx={{ width: '100%' }}
            >
                {snackBar.message}
            </Alert>
        </Snackbar>
    )
}
export default SnackBarCustom