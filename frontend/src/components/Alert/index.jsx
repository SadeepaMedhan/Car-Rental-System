import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';


export default function AlertSnackBar(props) {
    const [state, setState] = React.useState({
        open: props.open,
        Transition: Fade,
    });


    const handleClose = () => {
        setState({
            ...state,
            open: false,
        });
    };

    return (
        <div>
            <Snackbar
                open={state.open}
                onClose={handleClose}
                TransitionComponent={state.Transition}
                message={props.message}
                key={state.Transition.name}
            />
        </div>
    );
}
