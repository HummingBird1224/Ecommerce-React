import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {useState} from "react";
import authService from "../../services/auth.service";
import {Alert} from "@mui/material";

function ForgetPassword() {
	const [userName, setUserName] = useState();
	const [open,setOpen] = useState();
	const [error,setError] = useState();
	const [showError,setShowError] = useState(false);

	function handleClose(){
		setShowError(false);
		setOpen(false);
		setUserName("");
	}

	function handleChange(event){
		setShowError(false);
		if(event.target.id === "userName"){
			setUserName(event.target.value);
		}
	}

	function handleClickOpen(){
		setShowError(false);
		setOpen(true);
	}

	async function handleSubmit() {
		if (userName !== "" && userName !== undefined) {
			const res = await authService.forgetPassword(userName);
			console.log(res);
		} else {
			setError("Enter User Name");
			setShowError(true);
		}
	}

	return (
		<div>
			<Button variant="outlined" onClick={handleClickOpen}>
				Forget Password?
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Forget Password?</DialogTitle>
				<DialogContent>
					<div hidden={!showError}>
						<Alert severity="error">{error}</Alert>
					</div>
					<DialogContentText>
						Enter your username here. we will send you a conformation pin to your email address.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="userName"
						label="User Name"
						value={userName}
						onChange={handleChange}
						type="text"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmit}>Get Pin Code</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default ForgetPassword;