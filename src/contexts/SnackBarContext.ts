import { SnackbarProps } from "@mui/material";
import { createContext } from "react";

interface ISnackBar extends SnackbarProps {
    status: 'success' | 'error'
}

interface SnackBarContextType {
    snackBar: ISnackBar;
    setSnackBar: React.Dispatch<React.SetStateAction<ISnackBar>>;
}


const SnackBarContext = createContext<SnackBarContextType>(null);

export default SnackBarContext