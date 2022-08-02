import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useSelector} from "react-redux";
import {AppRootState, useAppDispatch} from "../../state/store";
import {setAppErrorAC} from "../../app/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    const error = useSelector<AppRootState,string|null>(state=>state.app.error);
    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') { ///   закрытие только на крестик
            return;
        }
        dispatch(setAppErrorAC(null))
    };

    const isOpen = error !==null;

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>

    );
}
