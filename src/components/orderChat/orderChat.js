import React, {useState} from "react";
import {
	Alert, Divider, Grid,
	List,
	ListItem,
	ListItemText, TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PropTypes from "prop-types";
import Axios from "axios";
import authService from "../../services/auth.service";
import utilityServices from "../../services/utilityServices";

function OrderChat(props){

	const [reply,setReply] = useState();
	const userId= authService.getCurrentUserId();


	function renderMessage(message){
		return(

			<Grid item mt={1} sx={message.senderId === userId ? {border: 1, borderRadius: "20px", position: "relative", left: 15} : {border: 1, borderRadius: "20px", position: "relative", left: -15}}>
				<ListItem alignItems="flex-start">
					<ListItemText
						primary={message.message}
						secondary={
							<React.Fragment>
								<Typography
									sx={{ position: "relative", display: "inline", left: 15 }}
									component="span"
									variant="body2"
									color="text.primary"
								>
									{utilityServices.getTime(message.date)}
								</Typography>
							</React.Fragment>
						}
					/>
				</ListItem>

				<Divider variant="inset" component="li" />
			</Grid>

		);

	}

	function handleSendReply() {
		if(reply !== "" && reply !== undefined){
			const newMsg = {
				message: reply
			};
			// eslint-disable-next-line no-undef
			Axios.post(`${process.env.REACT_APP_API_URL}/publicUsers/addChatMessage`,newMsg,{
				headers: {"x-auth-token": authService.getCurrentUser()}
			}).then(async (res)=>{
				if(!res.data.success){
					alert("error occured!");
				}else{
					console.log(res.data);
					props.messages.push(res.data.message);
					const updateForm = {
						messages: props.messages,
						id: props.orderId
					};
					//
					// eslint-disable-next-line no-undef
					Axios.put(`${process.env.REACT_APP_API_URL}/publicUsers/addChatMessage`,updateForm,{
						headers: {"x-auth-token": authService.getCurrentUser()}
					}).then(async (newRes)=>{
						if(!newRes.data.success){
							alert("Delete the message");
						}else{
							// eslint-disable-next-line react/prop-types
							props.setRefresh(!props.refresh);
						}
					});
				}
			});
		}else{
			alert("Can't send empty message!");
		}

		setReply("");
	}

	function handleChange(event) {
		event.preventDefault();
		if(event.target.name === "reply"){
			setReply(event.target.value);
		}
	}

	return(
		<Grid container>
			<Grid item xs={12}>
				<List sx={{ width: "100%", maxWidth: 560, bgcolor: "background.paper" }}>
					{props.messages.length === 0 ? (
						<Alert severity="info">You do not have any messages yet</Alert>
					):(
						<Grid>
							{props.messages.map(message=>renderMessage(message))}
						</Grid>
					)}
				</List>


				{/* eslint-disable-next-line react/prop-types */}
				<div>
					<TextField
						autoFocus
						margin="dense"
						id="reply"
						name="reply"
						onChange={handleChange}
						value={reply}
						label="Reply"
						type="text"
						fullWidth
						variant="standard"
						multiline
					/>
				</div>

				<div>
					<Button variant="contained" sx={{m:1}} color="primary" onClick={handleSendReply}>Send</Button>
				</div>

			</Grid>
		</Grid>
	);
}

OrderChat.propTypes = {
	messages: PropTypes.any,
	orderId: PropTypes.string
};



export default OrderChat;