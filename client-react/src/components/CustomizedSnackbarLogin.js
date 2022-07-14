import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbarLogin({error, open, setOpen}) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            {error &&    <Snackbar open={open} autoHideDuration={10000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}>
                 <Alert onClose={handleClose} severity="error" sx={{width: '100%'}} >{error}</Alert>
            </Snackbar>}
        </Stack>
    );
}
