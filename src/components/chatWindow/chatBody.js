import React, {useState} from "react";
import {
	Dialog, DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle, Divider, Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText, TextField
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import {Alert} from "@mui/lab";
import utilityServices from "../../services/utilityServices";
import Axios from "axios";
import authService from "../../services/auth.service";

function ChatBody(props){

	const [reply,setReply] = useState();
	const [error,setError] = useState();
	const [showError,setShowError] = useState(false);



	function handleSendReply() {
		if(reply === "" || reply === undefined){
			setError("You can't send an empty message");
			setShowError(true);
			return;
		}
		if(props.mode === 0){
			const form = {
				message: reply,
				requestId: props.request._id
			};

			// eslint-disable-next-line no-undef
			Axios.post(`${process.env.REACT_APP_API_URL}/officerUsers/addSupportRequestMessage`,form,{
				headers: {"x-auth-token": authService.getCurrentUser()}
			}).then(async (res)=>{
				if(!res.data.success){
					alert("error occured!");
				}else{
					props.request.messages.push(res.data.supportRequestMessage);
					const updateForm = {
						messages: props.request.messages,
						id: props.request._id
					};

					// eslint-disable-next-line no-undef
					Axios.put(`${process.env.REACT_APP_API_URL}/officerUsers/addSupportRequestMessage`,updateForm,{
						headers: {"x-auth-token": authService.getCurrentUser()}
					}).then(async (newRes)=>{
						if(!newRes.data.success){
							alert("Delete the message");
						}else{
							props.setRefresh(!props.refresh);
							setReply("");
						}
					});
				}
			});
		}else{
			alert("replyy");
		}
		

	}

	function exitRequest(){
		setReply("");
		props.handleClose();
	}


	function closeRequest() {

		if(props.mode === 0){
			const form = {
				id: props.request._id
			};

			// eslint-disable-next-line no-undef
			Axios.put(`${process.env.REACT_APP_API_URL}/officerUsers/closeSupportRequest`,form,{
				headers: {"x-auth-token": authService.getCurrentUser()}
			}).then(async (res)=>{
				if(!res.data.success){
					alert("error occured!");
				}else{
					props.setRefresh(!props.refresh);
					props.handleClose();
				}
			});
		}else{
			const form = {
				id: props.request._id
			};

			// eslint-disable-next-line no-undef
			Axios.put(`${process.env.REACT_APP_API_URL}/officerUsers/withdrawRefundRequest`,form,{
				headers: {"x-auth-token": authService.getCurrentUser()}
			}).then(async (res)=>{
				if(!res.data.success){
					alert("error occured!");
				}else{
					props.setRefresh(!props.refresh);
					props.handleClose();
				}
			});
		}


	}

	function handleChange(event) {
		setShowError(false);
		if(event.target.name === "reply"){
			setReply(event.target.value);
		}
	}

	function renderMessages(message){

		let sender = "Officer";
		let profilePicture = "https://res.cloudinary.com/drh02pftv/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1668790540/profilePictures/default_gerxri.jpg";
		if(props.mode === 1){
			if(message.senderId === props.request.buyerId._id){
				sender = props.request.buyerId.userName;
				profilePicture = props.request.buyerId.profilePicture;
			}
		}
		if(message.senderId === props.request.producerId._id){
			sender = props.request.producerId.userName;
			profilePicture = props.request.producerId.profilePicture;
		}


		return(
			<Grid mt={1} sx={message.sender === "officer" ? {border: 1, borderRadius: "20px", position: "relative", left: -15} : {border: 1, borderRadius: "20px", position: "relative", left: 15}}>
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar alt={sender} src={profilePicture} />
					</ListItemAvatar>
					<ListItemText
						primary={utilityServices.getTime(message.date)}
						secondary={
							<React.Fragment>
								<Typography
									sx={{ display: "inline" }}
									component="span"
									variant="body2"
									color="text.primary"
								>{sender} <br/>
								</Typography>
								{message.message}
								<br/>
							</React.Fragment>
						}
					/>
				</ListItem>
				<Divider variant="inset" component="li" />
			</Grid>
		);
	}

	const supportTypes = ["Agricultural Support","Technical Support","Report an Issue","Marketplace Support"];

	return(
		<Grid container>

			<Dialog open={props.open} onClose={props.handleClose}>
				<DialogTitle>{props.mode === 0 ? "Support Request" : "Refund Request"}</DialogTitle>
				<DialogContent>
					<Grid item hidden={!showError}>
						<Alert severity="error">{error}</Alert>
					</Grid>
					<DialogContentText>
						<List sx={{ width: "100%", maxWidth: 560, bgcolor: "background.paper" }}>
							<ListItem alignItems="flex-start">
								<ListItemAvatar>
									<Avatar alt={props.mode === 0 ? props.request.producerId.userName : props.request.buyerId.userName} src={props.mode === 0 ? props.request.producerId.profilePicture : props.request.buyerId.profilePicture} />
								</ListItemAvatar>
								<ListItemText
									primary={props.mode === 0 ? props.request.subject : "Order Id:" + props.request.orderId._id}
									secondary={
										<React.Fragment>
											<Typography
												sx={{ display: "inline" }}
												component="span"
												variant="body2"
												color="text.primary"
											>{props.mode === 0 ? props.request.producerId.userName : props.request.buyerId.userName} <br/>
											</Typography>
											{props.request.description}
											<br/>
											<Typography
												sx={{ display: "inline" }}
												component="span"
												variant="body2"
												color="text.primary"
											>{props.mode === 0 ? supportTypes[props.request.type] : "Refund Value - Rs. " + props.request.refundValue}  <br/>
											</Typography>
										</React.Fragment>
									}
								/>
							</ListItem>
							<Divider variant="inset" component="li" />

							{props.request.messages.map((msg) => renderMessages(msg))}


						</List>
					</DialogContentText>
					<div hidden={!props.request.isActive || props.mode === 1}>
						<TextField autoFocus margin="dense" id="reply" name="reply" onChange={handleChange} value={reply} label="Reply"
							type="text"
							fullWidth
							variant="standard"
							multiline
						/>

					</div>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" sx={{m:1}} color="primary" onClick={exitRequest}>Cancel</Button>
					<div hidden={!props.request.isActive || props.mode === 1}>
						<Button variant="contained" sx={{m:1}} color="primary" onClick={handleSendReply}>Send</Button>
					</div>

					<div hidden={!props.request.isActive || props.mode === 1 }>
						<Button variant="contained" sx={{m:1}} color="warning" onClick={closeRequest}>Close Request</Button>
					</div>

					<div hidden={!props.request.isActive || props.mode === 0 }>
						<Button variant="contained" sx={{m:1}} color="warning" onClick={closeRequest}>Mark as solved</Button>
					</div>

				</DialogActions>
			</Dialog>
		</Grid>
	);

}

ChatBody.propTypes = {
	request: PropTypes.object,
	process: PropTypes.any,
	handleClose: PropTypes.func,
	setRefresh: PropTypes.func,
	refresh: PropTypes.bool,
	open: PropTypes.bool,
	mode: PropTypes.number
};

export default ChatBody;