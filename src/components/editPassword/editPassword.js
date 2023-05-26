import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {useState} from "react";
import {Alert} from "@mui/material";
import Axios from "axios";
import authService from "../../services/auth.service";

function EditPassword() {
	const [currentPassword, setCurrentPassword] = useState();
	const [nextPassword, setNextPassword] = useState();
	const [nextPassword2, setNextPassword2] = useState();
	const [open,setOpen] = useState();
	const [error,setError] = useState();
	const [showError,setShowError] = useState(false);

	function handleClose(){
		setShowError(false);
		setOpen(false);
		setCurrentPassword("");
		setNextPassword("");
		setNextPassword2("");
	}

	function handleChange(event){
		setShowError(false);
		if(event.target.id === "currentPassword"){
			setCurrentPassword(event.target.value);
		}else if(event.target.id === "nextPassword"){
			setNextPassword(event.target.value);
		}else if(event.target.id === "nextPassword2"){
			setNextPassword2(event.target.value);
		}
	}

	function handleClickOpen(){
		setShowError(false);
		setOpen(true);
	}

	function isEmpty(value){
		return value === "" || value === undefined;
	}

	function isSimilar(val1,val2){
		return val1 === val2;
	}

	async function handleSubmit() {
		if (isEmpty(currentPassword)|| isEmpty(nextPassword) || isEmpty(nextPassword2)) {
			setError("Fill all the fields!");
			setShowError(true);
		} else if(!isSimilar(nextPassword,nextPassword2)){
			setError("Password and confirm password are not match");
			setShowError(true);
		} else if(isSimilar(currentPassword,nextPassword)){
			setError("Current password and new password are similar");
			setShowError(true);
		}else{

			const form = {
				id: authService.getCurrentUserId(),
				password: currentPassword,
				newPassword: nextPassword
			};
			// eslint-disable-next-line no-undef
			Axios.put(`${process.env.REACT_APP_API_URL}/allUsers/updatePassword`,form,{
				headers: {"x-auth-token": authService.getCurrentUser()}
			}).then( async (res)=>{
				if(!res.data.success){
					setError(res.data.msg);
					setShowError(true);
				}else if(res.data.success){
					handleClose();
				}else{
					setError("Error Occurred");
					setShowError(true);
				}

			});

		}
	}

	return (
		<div>
			<Button variant="outlined" onClick={handleClickOpen}>
				Edit Password
			</Button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Edit Password</DialogTitle>
				<DialogContent>
					<div hidden={!showError}>
						<Alert severity="error">{error}</Alert>
					</div>
					<DialogContentText>
						Enter Your Current Password and New Password
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="currentPassword"
						label="Current Password"
						value={currentPassword}
						onChange={handleChange}
						type="password"
						fullWidth
						variant="standard"
					/>

					<TextField
						autoFocus
						margin="dense"
						id="nextPassword"
						label="New Password"
						value={nextPassword}
						onChange={handleChange}
						type="password"
						fullWidth
						variant="standard"
					/>

					<TextField
						autoFocus
						margin="dense"
						id="nextPassword2"
						label="Confirm Password"
						value={nextPassword2}
						onChange={handleChange}
						type="password"
						fullWidth
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmit}>Change Password</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default EditPassword;