import React, {useState} from "react";
import {
	Chip,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import utilityServices from "../../services/utilityServices";
import ChatBody from "./chatBody";

function ChatList(props){

	const [activeRequest,setActiveRequest] = useState({_id:"", producerId: {_id:""}, buyerId: {_id:""}, messages: [{senderId:""}], orderId: {_id: ""}});
	const [open,setOpen] = useState(false);

	function onClickRequest(event){
		//todo: open status
		setActiveRequest(props.requests.filter(request => request._id === event.target.id)[0]);
		setOpen(true);

	}


	function handleClose(){
		setActiveRequest({_id:"", producerId: {_id:""}, buyerId: {_id:""},  messages: [{senderId:""}], orderId: {_id: ""}});
		setOpen(false);
	}


	function renderRequest(request){
		return(
			<Grid>
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar alt={props.mode === 0 ? request.producerId.userName:request.buyerId.userName } src={props.mode === 0 ? request.producerId.profilePicture:request.buyerId.profilePicture } />
					</ListItemAvatar>
					<ListItemText
						primary={props.mode === 0 ? request.producerId.userName:request.buyerId.userName }
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
											{props.mode === 0 ? request.subject: "Refund Value: Rs. " + request.refundValue}
										</Typography>
									</Grid>
									<Grid item xs={12} >
										{utilityServices.getTime(request.date)}
									</Grid>
									<Grid hidden={request.isOfficerRead} item xs={12} >
										<Chip color="success" label="unhandled" />
									</Grid>
								</Grid>
							</React.Fragment>
						}
					/>
					<Grid item xs={12} >
						<ListItemButton maxWidth={200} id={request._id} name={request._id} onClick={onClickRequest} dense>
							open
						</ListItemButton>
					</Grid>
				</ListItem>

				<Divider variant="inset" component="li" />
			</Grid>

		);
	}

	return (
		<Grid container>

			<Grid item xs={12}>
				<ChatBody refresh={props.refresh} setRefresh={props.setRefresh} open={open} handleClose={handleClose} request={activeRequest} mode={props.mode}/>
			</Grid>

			<Grid item xs={12}>
				<List sx={{ width: "100%", bgcolor: "background.paper" }}>

					{props.requests.map((request)=>renderRequest(request))}

				</List>
			</Grid>
		</Grid>

	);
}

ChatList.propTypes = {
	requests: PropTypes.object,
	process: PropTypes.any,
	handleClose: PropTypes.func,
	setRefresh: PropTypes.func,
	refresh: PropTypes.bool,
	mode: PropTypes.number
};

export default ChatList;