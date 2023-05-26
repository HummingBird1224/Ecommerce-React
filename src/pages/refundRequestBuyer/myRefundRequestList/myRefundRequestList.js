import React, {useState} from "react";
import {
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

function MyRefundRequestList(props){

	const [activeRequest,setActiveRequest] = useState();
	const [open,setOpen] = useState(false);
	const [reply,setReply] = useState();
	const [newValue,setNewValue] = useState();

	function onClickRequest(event){
		setActiveRequest(event.target.id);
		setOpen(true);

	}

	function handleChange(event){
		if(event.target.name === "reply"){
			setReply(event.target.value);
		}else if(event.target.name === "newValue"){
			setNewValue(event.target.value);
		}
	}

	function handleClose(){
		setActiveRequest(undefined);
		setReply(undefined);
		setNewValue(undefined);
		setOpen(false);
	}

	//todo:
	function handleSendReply(){
		alert(newValue);
		setActiveRequest(undefined);
		setReply(undefined);
		setNewValue(undefined);
		setOpen(false);
	}

	//todo:
	function acceptBuyer(){
		alert("Send To the farmer");
		setActiveRequest(undefined);
		setReply(undefined);
		setNewValue(undefined);
		setOpen(false);
	}

	return (
		<Grid container>

			<Grid item xs={12}>
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle>
						<Typography variant="h5">Refund Request - {activeRequest}</Typography>
						<Typography variant="subtitle1">Order Id - {"#0004785"}</Typography>
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							<List sx={{ width: "100%", maxWidth: 560, bgcolor: "background.paper" }}>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Remy Sharp" src="https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.6435-9/57402301_2442775932439604_5030131054145437696_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=174925&_nc_ohc=zzDTAqXehJ0AX85Z8Bx&_nc_ht=scontent.fcmb2-2.fna&oh=00_AT_PFF4lBDfe1k3PYYrNep5W-GdL0-UyIAiOyZiKSSv-iw&oe=6352AA3F" />
									</ListItemAvatar>
									<ListItemText
										primary="10/09/2022"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>Achira Dias <br/>
												</Typography>
												{"Sample Refund Request Description. The Indeed Editorial Team comprises a diverse and talented team of writers, researchers and subject matter experts equipped with Indeed's data and insights to deliver useful tips to help guide your career journey.\n" +
													"\n" +
													"Viewing a sample letter of request can help you write a similar letter. A letter of request sample demonstrates the best request letter format, content and tone. A sample letter is a good template for writing your own letter of request. In this article, we explain what sample letters of request are and how to use them, before explaining how to write a letter of request and providing some sample letters of request."}
												<br/>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>Refund Value - Rs. 1775 <br/>
												</Typography>
											</React.Fragment>
										}
									/>
								</ListItem>

								<Divider variant="inset" component="li" />

								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Remy Sharp" src="https://scontent.fcmb1-2.fna.fbcdn.net/v/t39.30808-6/305652696_2017821475071738_1772119493642692274_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=VyggVEEtIPYAX_i6OtN&_nc_oc=AQkFP1RgAfzw6BF30IuXIxnfQEjYUTXbIowJPQKssFlx5icdRFPM4yerIo3ucjJ3kM7RN77MV89GzK6Rt-nwf7Z3&_nc_ht=scontent.fcmb1-2.fna&oh=00_AT9EbQR5mHbaMF2qvPB1lvXgh_ZfGjHse90t0m6fnMTQyw&oe=6334D685" />
									</ListItemAvatar>
									<ListItemText
										primary="12/09/2022"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>Nipun Agro <br/>
												</Typography>
												{"Sample Reply. The Indeed Editorial Team comprises a diverse and talented team of writers, researchers and subject matter experts equipped with Indeed's data and insights to deliver useful tips to help guide your career journey.\n" +
													"\n" +
													"Viewing a sample letter of request can help you write a similar letter. A letter of request sample demonstrates the best request letter format, content and tone. A sample letter is a good template for writing your own letter of request. In this article, we explain what sample letters of request are and how to use them, before explaining how to write a letter of request and providing some sample letters of request."}
												<br/>
												<Typography
													sx={{ display: "inline" }}
													component="span"
													variant="body2"
													color="text.primary"
												>Refund Value - Rs. 1000 <br/>
												</Typography>
											</React.Fragment>
										}
									/>
								</ListItem>
							</List>
						</DialogContentText>
						{/* eslint-disable-next-line react/prop-types */}
						<div hidden={props.mode !== "1"}>
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

							<TextField
								autoFocus
								margin="dense"
								id="newValue"
								onChange={handleChange}
								value={newValue}
								name="newValue"
								label="Suggesting Refund Value"
								type="number"
								fullWidth
								variant="standard"
							/>
						</div>
					</DialogContent>
					<DialogActions>
						<Button sx={{m:1}} variant="contained" color="primary" onClick={handleClose}>Cancel</Button>
						{/* eslint-disable-next-line react/prop-types */}
						<Grid item hidden={props.mode !== "1"}>
							<Button sx={{m:1}} variant="contained" color="primary" onClick={handleSendReply}>Send Your Reply</Button>
							<Button sx={{m:1}} variant="contained" color="warning" onClick={acceptBuyer}>Accept Rs.1000</Button>
						</Grid>
					</DialogActions>
				</Dialog>
			</Grid>

			<Grid item xs={12}>
				<List sx={{ width: "100%", bgcolor: "background.paper" }}>

					<ListItem alignItems="flex-start">
						<ListItemAvatar>
							<Avatar alt="Remy Sharp" src="https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.6435-9/57402301_2442775932439604_5030131054145437696_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=174925&_nc_ohc=zzDTAqXehJ0AX85Z8Bx&_nc_ht=scontent.fcmb2-2.fna&oh=00_AT_PFF4lBDfe1k3PYYrNep5W-GdL0-UyIAiOyZiKSSv-iw&oe=6352AA3F" />
						</ListItemAvatar>
						<ListItemText
							primary="Order ID: #001475686"
							secondary={
								<React.Fragment>
									<Grid container>
										<Grid item xs={12} sm={6}>
											<Typography
												sx={{ display: "inline" }}
												component="span"
												variant="body2"
												color="text.primary"
											>
												Achira Dias
											</Typography>
										</Grid>
										<Grid item xs={12} >
											{"Refund Value: Rs. 1775"}
										</Grid>
										<Grid item xs={12}>
											{"Refund Deadline: 23/10/2022"}
										</Grid>
									</Grid>
								</React.Fragment>
							}
						/>
						<ListItemButton id={"#00007"} name={"#00007"} onClick={onClickRequest} dense>
							Open
						</ListItemButton>
					</ListItem>

					<Divider variant="inset" component="li" />

					<ListItem alignItems="flex-start">
						<ListItemAvatar>
							<Avatar alt="Remy Sharp" src="https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.6435-9/57402301_2442775932439604_5030131054145437696_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=174925&_nc_ohc=zzDTAqXehJ0AX85Z8Bx&_nc_ht=scontent.fcmb2-2.fna&oh=00_AT_PFF4lBDfe1k3PYYrNep5W-GdL0-UyIAiOyZiKSSv-iw&oe=6352AA3F" />
						</ListItemAvatar>
						<ListItemText
							primary="Order ID: #001434356"
							secondary={
								<React.Fragment>
									<Grid container>
										<Grid item xs={12} sm={6}>
											<Typography
												sx={{ display: "inline" }}
												component="span"
												variant="body2"
												color="text.primary"
											>
												Ransika Costa
											</Typography>
										</Grid>
										<Grid item xs={12}>
											{"Refund Value: Rs. 2115"}
										</Grid>
										<Grid item xs={12}>
											{"Refund Deadline: 23/10/2022"}
										</Grid>
									</Grid>
								</React.Fragment>
							}
						/>
						<ListItemButton id={"#00001"} name={"#00001"} onClick={onClickRequest}>
							Open
						</ListItemButton>
					</ListItem>

					<Divider variant="inset" component="li" />

					<ListItem alignItems="flex-start">
						<ListItemAvatar>
							<Avatar alt="Remy Sharp" src="https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.6435-9/57402301_2442775932439604_5030131054145437696_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=174925&_nc_ohc=zzDTAqXehJ0AX85Z8Bx&_nc_ht=scontent.fcmb2-2.fna&oh=00_AT_PFF4lBDfe1k3PYYrNep5W-GdL0-UyIAiOyZiKSSv-iw&oe=6352AA3F" />
						</ListItemAvatar>
						<ListItemText
							primary="Order ID: #001434356"
							secondary={
								<React.Fragment>
									<Grid container>
										<Grid item xs={12} sm={6}>
											<Typography
												sx={{ display: "inline" }}
												component="span"
												variant="body2"
												color="text.primary"
											>
												Nipun Pramuditha
											</Typography>
										</Grid>
										<Grid item xs={12}>
											{"Refund Value: Rs. 1000"}
										</Grid>
										<Grid item xs={12}>
											{"Refund Deadline: 23/10/2022"}
										</Grid>
									</Grid>
								</React.Fragment>
							}
						/>
						<ListItemButton id={"#00017"} name={"#00017"} onClick={onClickRequest}>
							Open
						</ListItemButton>
					</ListItem>

				</List>
			</Grid>
		</Grid>

	);
}

export default MyRefundRequestList;