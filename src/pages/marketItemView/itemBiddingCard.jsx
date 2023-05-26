import React, { useEffect, useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle, FormControl,
	Grid,
	Typography
} from "@mui/material";
import CountdownTimer from "../../components/countdownTimer/countdownTimer";
import BidTable from "./bidTable";
import _ from "lodash";
import PropTypes from "prop-types";
import { buyerSetBidForItem } from "../../services/itemServices";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import socketHandler from "../../util/socketHandler";
import moment from "moment";
import authService from "../../services/auth.service";

function ItemBiddingCard(props) {
//	const { endTime, bidArray, minimumBid, itemId, bidStep } = props.biddingData;
	// eslint-disable-next-line no-unused-vars
//	const [lastBid, setLastBid] = useState(bidArray.length > 0 ? _.last(bidArray).bid_amount : minimumBid);
//	const [bidValue, setBidValue] = useState(lastBid);
	const [error, setError] = useState(false);
	const [open, setOpen] = React.useState(false);

//	const [pageSocket, setPageSocket] = useState(null);
	// eslint-disable-next-line no-unused-vars
//	const [bidEntries, setBidEntries] = useState(bidArray);
//	const [tick, setTick] = useState(0);
	// eslint-disable-next-line no-unused-vars
//	const [pageMode, setPageMode] = useState(false); // false: normal mode, true: socket mod

	// 1 s server side polling to check time
	/* useEffect(() => {
		if (endTime) {
			const currentTimeMili = moment().unix();
			const endTimeMili = moment(endTime).unix();
			console.log(pageMode);
			// Pagemode changes here
			if (currentTimeMili + 900 > endTimeMili) {
				setPageMode(true);
			} else {
				setPageMode(false);
			}
		}
	}, [tick]); */

	//Initialize Socket
	/* useEffect(() => {
		const fetchSocket = async () => {
			const so = await socketHandler.startSocket();
			setPageSocket(so);
		};
		fetchSocket();
	}, []); */

	//The Tick Socket
/* 	useEffect(() => {
		if (pageSocket) {
			pageSocket.emit("tick", {
				itemListing: itemId
			});

			//Recieve Tick
			pageSocket.on("message", (data) => {
				setTick(data);
			});
		}
	}, [pageSocket]); */

	//The Bid placement socket connection
	/* useEffect(() => {
		if (pageSocket && pageMode) {

			//Recieve Data
			pageSocket.on("receive_bid_update", (data) => {
				console.log("SocketREcied - ", data);
				if (data.error == true) {
					setError(true);
				} else {
					setBidEntries(data.res_array);
					setLastBid(data.res_array[data.res_array.length - 1].bid_amount);
				}
			});

			//Post Data
			pageSocket.emit("join_listing", { itemListing: itemId });
		}
	}, [pageSocket, pageMode]); */


	//Bid Submission in Socket mode
	/* const socketModeBidPlacement = async () => {
		const dataObject = { itemId: itemId, userId: authService.getCurrentUserId(), bidValue: bidValue };
		const result = await pageSocket.emit("place_bid", dataObject);
		console.log("button submission soc mode ", result);
		return result;
	}; */

	//Bid Submission in Normal mode
	/* const normalModeBidPlacement = async () => {
		const dataObject = { itemId: itemId, userId: authService.getCurrentUserId(), bidValue: bidValue };
		const result = await buyerSetBidForItem(itemId, dataObject);
		return result.data;
	}; */

	// Bid Mode Decider
	/* async function submitMethodDecider() {
		let result = false;
		if (pageMode) {
			result = await socketModeBidPlacement();
		} else {
			result = await normalModeBidPlacement();
		}

		return result;
	} */


	// Popup after Front end validation
	/* const handleClickOpen = () => {
		if (bidValue <= lastBid + bidStep) {
			setError(true);
			return;
		}
		setError(false);
		setOpen(true);
	}; */

	// close pop up without submission
	const handleClose = () => {
		setOpen(false);
	};

	// Bid input change
	/* function handleBidChange(event) {
		let newValue = event.target.value;
		console.log(newValue);
		const x = parseInt(newValue);
		if (event.target.name === "bidValue" && x >= 0 && x <= 1000000000000) {
			setBidValue(x);
		} else if (newValue == "") {
			setBidValue(newValue);
		}
	} */

	// Bid submission on click confirm
	/* const handleSubmit = async () => {
		const res = await submitMethodDecider();
		console.log("Click response", res);
		if (res.error == true) {
			console.log("Error Occured");
			//Handle error here
		} else {
			setOpen(false);
		}
		//Handle change here
		props.refreshPageDetails();
		// Add Submitted Alert Here or Error
	}; */

	const { name, description, location, quantity, crop } = props.biddingData;

	/* const bidConfirmPopup = () => {
		return (
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{"Confirm Bid Amount ?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						You are about to place a bid of amount {Intl.NumberFormat("en", { style: "currency", currency: "LKR" }).format(bidValue)}. Please verify the amount before submitting. You may have to contact the seller through customer support to undo this action.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						variant={"contained"}
						sx={{ color: "white" }}>
						Discard
					</Button>
					<Button
						onClick={}
						autoFocus
						color={"error"}
						variant={"contained"}
					>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		);
	}; */

	return (
		<Grid item container direction={"column"} justifyContent={"flex-end"} alignItems={"stretch"} spacing={2} >
			<Grid item container justifyContent={"left"} mt={2}>
				<Grid item>
					<Typography variant={"h4"}>
						{name}
					</Typography>
				</Grid>
			</Grid>
			<Grid item container justifyContent={"center"} mt={2}>
				<Grid item xs={12}>
					<Typography variant={"h6"}>
						Description
					</Typography>
					<Typography variant={"body1"} align={"left"} textAlign={"left"}>
						{description}
					</Typography>
				</Grid>
			</Grid>
			<Grid item container justifyContent={"center"} mt={2}>
				<Grid item xs={12}>
					<Typography variant={"h6"}>
						Crop Type: {crop}
					</Typography>
				</Grid>
			</Grid>
			<Grid item container justifyContent={"center"} mt={2}>
				<Grid item xs={12}>
					<Typography variant={"h6"}>
						Quantity: {quantity} kg
					</Typography>
				</Grid>
			</Grid>
			<Grid item container justifyContent={"center"} mt={2}>
				<Grid item xs={12}>
					<Typography variant={"h6"}>
						Location: {location.state}
					</Typography>
				</Grid>
			</Grid>
			{/* <Divider sx={{marginLeft:"15px", marginTop:"30px"}}>Bidding Details</Divider>
			<Grid item container justifyContent={"center"} textAlign={"center"}>
				<Grid item xs={12}>
					<CountdownTimer endTime={endTime}/>
				</Grid>
				<Grid item xs={12}>
					<Typography variant={"h6"}>
					(End date-time {moment(endTime).format("yyyy/MM/DD HH:mm:ss")}h )
					</Typography>
				</Grid>
			</Grid>
			<Grid item container justifyContent={"center"} mt={2}>
				<Grid item xs={12}>
					<Typography variant={"h6"} color={"green"} fontWeight={"bold"}>
								Last bid : {Intl.NumberFormat("en", { style: "currency", currency: "LKR" }).format(lastBid) }
					</Typography>
				</Grid>
			</Grid>
			<Grid item  container justifyContent={"center"} mt={2}>
				<Grid item xs={12}>
					<Typography variant={"h7"}  fontWeight={"bold"}>
								Starting bid : {Intl.NumberFormat("en", { style: "currency", currency: "LKR" }).format(minimumBid) }
					</Typography>
				</Grid>
			</Grid> */}
			{props.user == 1 ?
				(<Grid item container>
					<Grid item container justifyContent={"left"} mt={2}>
						<Grid item xs={5}>
							<Typography variant={"h6"} fontWeight={"bold"}>
								Place your Bid
							</Typography>
						</Grid>
						<Grid item xs={1}>
							<Typography variant={"h6"} fontWeight={"bold"}>
								:
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<FormControl fullWidth>
								<TextField
									type={"number"}
									helperText={`Enter Bid amount greater than ${Intl.NumberFormat("en", { style: "currency", currency: "₹" }).format(lastBid + bidStep)}`}
									error={error}
									name="bidValue"
									label="Bid Value"
								//	onChange={}
									value={77}
								/>
							</FormControl>
						</Grid>
					</Grid>
					{/* <Grid item container justifyContent={"center"} mt={2}>
						<Grid item xs={12}>
							<Button variant={"contained"} color={"warning"} onClick={handleClickOpen} disabled={moment().unix()>moment(endTime).unix()}>Place Bid</Button>
						</Grid>
					</Grid> */}
				</Grid>) :
				null
			}
			{/* <Grid item container justifyContent={"center"} mt={2}>
				<Grid item xs={12}>
					<BidTable bidderArray={bidEntries} user={props.user} />
				</Grid>
			</Grid> */}
			{/* {bidConfirmPopup()} */}
		</Grid>
	);
}

ItemBiddingCard.propTypes = {
	refreshPageDetails: PropTypes.func.isRequired,
	biddingData: PropTypes.object.isRequired,
	user: PropTypes.number.isRequired
};

export default ItemBiddingCard;
