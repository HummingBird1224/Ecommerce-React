import React, {useState} from "react";
import {
	Chip,
	Dialog, DialogActions, DialogContent, DialogContentText,
	DialogTitle,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText, TextField
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Axios from "axios";
import authService from "../../services/auth.service";
import utilityServices from "../../services/utilityServices";

function SupportRequestList(props){

	const [activeRequest,setActiveRequest] = useState({type: 0, subject: "", messages: []});
	const [open,setOpen] = useState(false);
	const [reply,setReply] = useState();

	function onClickRequest(event){
		// eslint-disable-next-line no-undef
		Axios.put(`${process.env.REACT_APP_API_URL}/producerUsers/openSupportRequest`,{
			id: event.target.id
		},{
			headers: {"x-auth-token": authService.getCurrentUser()}
		}).then(async (newRes)=>{
			if(!newRes.data.success){
				alert("can not sync with the server");
			}else{
				// eslint-disable-next-line react/prop-types
				props.setRefresh(props.refresh + 1);
			}
		});
		// eslint-disable-next-line react/prop-types
		setActiveRequest(props.requests.filter(request => request._id === event.target.id)[0]);
		setOpen(true);

	}

	function handleChange(event){
		if(event.target.name === "reply"){
			setReply(event.target.value);
		}
	}

	function handleClose(){
		setActiveRequest({type: 0, subject: "", messages: []});
		setReply(undefined);
		setOpen(false);
	}

	//todo:
	function handleSendReply(){
		if(reply !== "" && reply !== undefined){
			const newMsg = {
				message: reply,
				requestId: activeRequest._id
			};
			// eslint-disable-next-line no-undef
			Axios.post(`${process.env.REACT_APP_API_URL}/producerUsers/addSupportRequestMessage`,newMsg,{
				headers: {"x-auth-token": authService.getCurrentUser()}
			}).then(async (res)=>{
				if(!res.data.success){
					alert("error occured!");
				}else{
					activeRequest.messages.push(res.data.supportRequestMessage);
					const updateForm = {
						messages: activeRequest.messages,
						id: activeRequest._id
					};

					// eslint-disable-next-line no-undef
					Axios.put(`${process.env.REACT_APP_API_URL}/producerUsers/addSupportRequestMessage`,updateForm,{
						headers: {"x-auth-token": authService.getCurrentUser()}
					}).then(async (newRes)=>{
						if(!newRes.data.success){
							alert("Delete the message");
						}else{
							// eslint-disable-next-line react/prop-types
							props.setRefresh(props.refresh + 1);
						}
					});
				}
			});
		}else{
			alert("Can't send empty message!");
		}

		setReply("");
	}

	function closeRequest(){
		//todo: implement
		alert("Close request");
	}

	const supportTypes = ["Agricultural Support","Technical Support","Report an Issue","Marketplace Support"];

	function renderSupportRequest(supportRequest){
		return(
			<Grid>
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						{/* eslint-disable-next-line react/prop-types */}
						<Avatar alt={props.user.firstName + " " + props.user.lastName} src={props.user.login.profilePicture} />
					</ListItemAvatar>
					<ListItemText
						primary={supportRequest.subject}
						secondary={
							<React.Fragment>
								<Grid container>
									<Grid item xs={12}>
										<Typography
											sx={{ display: "inline" }}
											component="span"
											variant="body2"
											color="text.primary"
										>
											{supportTypes[supportRequest.type]}
										</Typography>
									</Grid>
									<Grid item xs={12} >
										{utilityServices.getTime(supportRequest.date)}
									</Grid>
									<Grid hidden={supportRequest.isProducerRead} item xs={12} >
										<Chip color="success" label="new" />
									</Grid>
								</Grid>
							</React.Fragment>
						}
					/>
					<Grid item xs={12} >
						<ListItemButton  id={supportRequest._id} name={supportRequest._id} onClick={onClickRequest} dense>
							open
						</ListItemButton>
					</Grid>
				</ListItem>

				<Divider variant="inset" component="li" />
			</Grid>

		);
	}

	function renderMessages(message){
		const sender = message.senderId === activeRequest.producerId._id ? activeRequest.producerId.userName: "Officer";

		return(
			<Grid>
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar alt={sender} src={message.senderId === activeRequest.producerId._id ? activeRequest.producerId.profilePicture: "https://res.cloudinary.com/drh02pftv/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1668790540/profilePictures/default_gerxri.jpg"}/>
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


	return (
		<Grid container>

			<Grid item xs={12}>
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle>{supportTypes[activeRequest.type]} - {activeRequest.subject}</DialogTitle>
					<DialogContent>
						<DialogContentText>
							<Typography>{activeRequest.description}</Typography>

							<List sx={{ width: "100%", maxWidth: 560, bgcolor: "background.paper" }}>
								{activeRequest.messages.map((msg) => renderMessages(msg))}
							</List>
						</DialogContentText>
						{/* eslint-disable-next-line react/prop-types */}
						<div hidden={props.mode === "3"}>
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
					</DialogContent>
					<DialogActions>
						<Button variant="contained" sx={{m:1}} color="primary" onClick={handleClose}>Cancel</Button>
						{/* eslint-disable-next-line react/prop-types */}
						<div hidden={props.mode === "3"}>
							<Button variant="contained" sx={{m:1}} color="primary" onClick={handleSendReply}>Send Your Reply</Button>
						</div>
						{/* eslint-disable-next-line react/prop-types */}
						<div hidden={props.mode === "3" || props.userType !== 3}>
							<Button variant="contained" sx={{m:1}} color="warning" onClick={closeRequest}>Close Request</Button>
						</div>

					</DialogActions>
				</Dialog>
			</Grid>

			<Grid item xs={12}>
				<List sx={{ width: "100%", bgcolor: "background.paper" }}>

					{/* eslint-disable-next-line react/prop-types */}
					{props.requests.map((request) => renderSupportRequest(request))}

				</List>
			</Grid>
		</Grid>

	);
}

export default SupportRequestList;