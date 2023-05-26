import React, {useState} from "react";
import {
	Chip,

	Divider,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import utilityServices from "../../services/utilityServices";
import RefundRequestChatWindow from "../refundChatWindow/refundChatWindow";
import PropTypes from "prop-types";
import Axios from "axios";
import authService from "../../services/auth.service";

function RefundRequestList(props){

	const [open,setOpen] = useState(false);
	const [refundRequest,setRefundRequest] = useState({_id: "", orderId: {_id: ""},buyerId: {_id: ""}, messages: []});

	function onClickRequest(event){

		// eslint-disable-next-line no-undef
		Axios.put(`${process.env.REACT_APP_API_URL}/publicUsers/openRefundRequest`,{
			id: event.target.id
		},{
			headers: {"x-auth-token": authService.getCurrentUser()}
		}).then(async (newRes)=>{
			if(!newRes.data.success){
				alert("can not sync with the server");
			}else{
				// eslint-disable-next-line react/prop-types
				props.setRefresh(!props.refresh);
			}
		});

		setRefundRequest(props.requests.filter(request => request._id === event.target.id)[0]);
		setOpen(true);

	}


	function handleClose(){
		setRefundRequest({_id: "", orderId: {_id: ""},buyerId: {_id: ""}, messages: []});
		setOpen(false);
	}


	function renderSupportRequest(refundRequest){
		return(
			<Grid>
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						{/* eslint-disable-next-line react/prop-types */}
						<Avatar alt={refundRequest.buyerId.userName} src={refundRequest.buyerId.profilePicture} />
					</ListItemAvatar>
					<ListItemText
						primary={refundRequest.buyerId.userName}
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
											{"Refund Value: Rs. " + refundRequest.refundValue}
										</Typography>
									</Grid>
									<Grid item xs={12} >
										{utilityServices.getTime(refundRequest.date)}
									</Grid>
									{/* eslint-disable-next-line react/prop-types */}
									<Grid hidden={refundRequest.isProducerRead} item xs={12} >
										{/* eslint-disable-next-line react/prop-types */}
										<Chip color="success" label="new" />
									</Grid>
								</Grid>
							</React.Fragment>
						}
					/>
					<Grid item xs={12} >
						<ListItemButton  id={refundRequest._id} name={refundRequest._id} onClick={onClickRequest} dense>
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
				<RefundRequestChatWindow refresh={props.refresh} setRefresh={props.setRefresh} open={open} handleClose={handleClose} refundRequest={refundRequest}/>
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

RefundRequestList.propTypes = {
	requests: PropTypes.object,
	process: PropTypes.any,
	handleClose: PropTypes.func,
	setRefresh: PropTypes.func,
	refresh: PropTypes.bool
};

export default RefundRequestList;