import * as React from 'react';
import PropTypes from 'prop-types';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import styled from "styled-components";
import {colors, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {theme} from "../theme";


function SimpleDialog({onClose, selectedValue, open}) {
    const handleClose = () => {
        onClose(selectedValue);
    };

    const P = styled.p`
      font-size: 16px;
      margin-bottom: 0;
    `
    const FeatureDetails = styled.div`
     padding: 0 10px 10px;
    `

    return (
        <Dialog onClose={handleClose} open={open}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "800px",  // Set your width here
                        },
                    },
                }}
        >
            <DialogTitle>Feature description by {selectedValue.brandName} {selectedValue.modelName}</DialogTitle>
            <FeatureDetails>
            <Typography>
                {selectedValue.description.split("\n").map((item, key) => {
                    return <P key={key}>{item}</P>;
                })}
            </Typography>
            </FeatureDetails>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color:theme.colors.main
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.object.isRequired,
};

const StyledButton = styled.button`
  border: 1px solid ${props => props.theme.colors.main};
  border-radius: 10px;
  background: transparent;
  color: ${props => props.theme.colors.main};
  font-size: 16px;
  padding: 5px 10px;
  cursor: pointer;
`
const FeatureDetailsDialog = ({description, modelName, brandName}) => {
    const [open, setOpen] = React.useState(false);
    // const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        // setSelectedValue(value);
    };

    return (
        <div>
            <br/>
            <StyledButton variant="outlined" onClick={handleClickOpen}>
                Feature Details
            </StyledButton>
            <SimpleDialog
                selectedValue={{description, brandName, modelName}}

                open={open}
                onClose={handleClose}
            />
        </div>
    );
}

export default FeatureDetailsDialog