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
import authService from "../../services/auth.service";
import {Alert} from "@mui/lab";
import Axios from "axios";
import utilityServices from "../../services/utilityServices";

function RefundRequestChatWindow(props){

	const [reply,setReply] = useState();
	const [error,setError] = useState();
	const [showError,setShowError] = useState(false);

	const userType = authService.getCurrentUserType();

	function handleSendReply() {
		if(reply === "" || reply === undefined){
			setError("You can't send an empty message");
			setShowError(true);
			return;
		}
		const form = {
			message: reply,
			requestId: props.refundRequest._id
		};

		// eslint-disable-next-line no-undef
		Axios.post(`${process.env.REACT_APP_API_URL}/publicUsers/addRefundRequestMessage`,form,{
			headers: {"x-auth-token": authService.getCurrentUser()}
		}).then(async (res)=>{
			if(!res.data.success){
				alert("error occured!");
			}else{
				props.refundRequest.messages.push(res.data.refundRequestMessage);
				const updateForm = {
					messages: props.refundRequest.messages,
					id: props.refundRequest._id
				};

				// eslint-disable-next-line no-undef
				Axios.put(`${process.env.REACT_APP_API_URL}/publicUsers/addRefundRequestMessage`,updateForm,{
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
	}

	function exitRequest(){
		setReply("");
		props.handleClose();
	}

	function handleRefund() {
		alert("refunded!");
	}

	function closeRequest() {
		const form = {
			id: props.refundRequest._id
		};

		// eslint-disable-next-line no-undef
		Axios.put(`${process.env.REACT_APP_API_URL}/buyerUsers/withdrawRefundRequest`,form,{
			headers: {"x-auth-token": authService.getCurrentUser()}
		}).then(async (res)=>{
			if(!res.data.success){
				alert("error occured!");
			}else{
				props.setRefresh(!props.refresh);
			}
		});
	}

	function handleChange(event) {
		setShowError(false);
		if(event.target.name === "reply"){
			setReply(event.target.value);
		}
	}

	function renderMessages(message){
		const sender = message.senderId === props.refundRequest.buyerId._id ? props.refundRequest.buyerId.userName: props.refundRequest.producerId.userName;

		return(
			<Grid>
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar alt={sender} src={message.senderId === props.refundRequest.buyerId._id ? props.refundRequest.buyerId.profilePicture: props.refundRequest.producerId.profilePicture} />
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

	function sendToOfficer() {
		const form = {
			id: props.refundRequest._id
		};

		// eslint-disable-next-line no-undef
		Axios.put(`${process.env.REACT_APP_API_URL}/buyerUsers/sendRefundRequestToOfficer`,form,{
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

	return(
		<Grid container>

			{/* eslint-disable-next-line react/prop-types */}
			<Dialog open={props.open} onClose={props.handleClose}>
				{/* eslint-disable-next-line react/prop-types */}
				<DialogTitle>Refund Request - {props.refundRequest._id}</DialogTitle>
				<DialogContent>
					<Grid item hidden={!showError}>
						<Alert severity="error">{error}</Alert>
					</Grid>
					<Grid item hidden={!props.refundRequest.isSendToOfficer}>
						<Alert severity="info">This refund request has forwarded to officers. They will personally contact you regarding this request</Alert>
					</Grid>
					<Grid item hidden={props.refundRequest.isSendToOfficer || userType !== 1}>
						<Alert severity="info">You can forward the request to an officer for help using Ask Help button after 2 weeks</Alert>
					</Grid>
					<DialogContentText>
						<List sx={{ width: "100%", maxWidth: 560, bgcolor: "background.paper" }}>
							<ListItem alignItems="flex-start">
								<ListItemAvatar>
									<Avatar alt={props.refundRequest.buyerId.userName} src={props.refundRequest.buyerId.profilePicture} />
								</ListItemAvatar>
								<ListItemText
									primary={"Order ID - " + props.refundRequest.orderId._id}
									secondary={
										<React.Fragment>
											<Typography
												sx={{ display: "inline" }}
												component="span"
												variant="body2"
												color="text.primary"
											>{props.refundRequest.buyerId.userName} <br/>
											</Typography>
											{props.refundRequest.description}
											<br/>
											<Typography
												sx={{ display: "inline" }}
												component="span"
												variant="body2"
												color="text.primary"
											>Refund Value - Rs. {props.refundRequest.refundValue} <br/>
											</Typography>
										</React.Fragment>
									}
								/>
							</ListItem>
							<Divider variant="inset" component="li" />

							{props.refundRequest.messages.map((msg) => renderMessages(msg))}


						</List>
					</DialogContentText>
					{/* eslint-disable-next-line react/prop-types */}
					<div hidden={!props.refundRequest.isActive}>
						{/* eslint-disable-next-line react/prop-types */}
						<TextField autoFocus margin="dense" id="reply" name="reply" onChange={handleChange} value={reply}
							label="Reply"
							type="text"
							fullWidth
							variant="standard"
							multiline
						/>

					</div>
				</DialogContent>
				<DialogActions>
					{/* eslint-disable-next-line react/prop-types */}
					<Button variant="contained" sx={{m:1}} color="primary" onClick={exitRequest}>Cancel</Button>
					{/* eslint-disable-next-line react/prop-types */}
					<div hidden={!props.refundRequest.isActive}>
						<Button variant="contained" sx={{m:1}} color="primary" onClick={handleSendReply}>Send</Button>
					</div>
					<div hidden={userType !== 0 || !props.refundRequest.isActive}>
						{/* eslint-disable-next-line react/prop-types */}
						<Button variant="contained" sx={{m:1}} color="warning" onClick={handleRefund}>Refund Rs. {props.refundRequest.refundValue}</Button>
					</div>

					<div hidden={userType !== 1 || !props.refundRequest.isActive}>
						{/* eslint-disable-next-line react/prop-types */}
						<Button variant="contained" sx={{m:1}} color="warning" onClick={closeRequest}>Withdraw Request</Button>
					</div>

					<div hidden={userType !== 1 || !props.refundRequest.isActive || !utilityServices.testHelpValidity(props.refundRequest.date) || props.refundRequest.isSendToOfficer}>
						{/* eslint-disable-next-line react/prop-types */}
						<Button variant="contained" sx={{m:1}} color="warning" onClick={sendToOfficer}>Ask Help</Button>
					</div>

				</DialogActions>
			</Dialog>
		</Grid>
	);
	
}

RefundRequestChatWindow.propTypes = {
	refundRequest: PropTypes.object,
	process: PropTypes.any,
	handleClose: PropTypes.func,
	setRefresh: PropTypes.func,
	refresh: PropTypes.bool
};

export default RefundRequestChatWindow;