import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({setOpen, username, error, open}) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            {error &&    <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
                 <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>{error}</Alert>
            </Snackbar>}
            {username && <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                    {username}, to complete the registration, follow the link indicated it the email
                </Alert>
            </Snackbar>}
        </Stack>
    );
}
