import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import Button from "@mui/material/Button";

function ModalSignin(props) {


    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={props.handleSubmit}>Sign in</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalSignin;