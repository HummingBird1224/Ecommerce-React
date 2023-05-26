import React from "react";
import {FormControl, FormLabel, Grid, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import CountdownTimer from "../../components/countdownTimer/countdownTimer";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import moment from "moment/moment";
import "react-image-crop/dist/ReactCrop.css";
import PropTypes from "prop-types";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";

function SetBiddingCard(props){

	function onChangeMinBid(event){
		if(event.target.value==""){
			props.setMinimumBid(event.target.value);
		}else if(event.target.value>=0 && event.target.value<=1000000000) {
			const value = Math.ceil(event.target.value);
			props.setMinimumBid(value);
		}
		props.setMinimumBidStep("");
	}

	function onChangeMinBidStep(event){
		if(event.target.value==""){
			props.setMinimumBidStep(event.target.value);
		}else if(event.target.value>=0 && event.target.value<=props.minimumBid/10){
			const value = Math.ceil(event.target.value);
			props.setMinimumBidStep(value);
		}
	}

	return(
		<Grid item container xs={12}>
			<Grid item container xs={12}>
				<Grid container>
					<Grid item xs={12} container justifyContent={"left"} m={3}>
						<Grid item>
							<Typography variant={"h5"}>
								Bidding Setup
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<hr
								style={{
									color: "black",
									backgroundColor: "black",
									height: 0.1
								}}
							/>
						</Grid>
					</Grid>
					<Grid item xs={12} container justifyContent={"center"} mt={3}>
						<Grid item xs={12}>
							<CountdownTimer endTime={props.bidEndTime}/>
						</Grid>
					</Grid>
					<Grid item xs={12} container justifyContent={"center"} mt={3} ml={3} mr={3}>
						<Grid item xs={12}>
							<Typography align={"center"} sx={{ typography: { md:"h6", sm: "h5", xs: "body1" }, overflow:"hidden" }} color={"green"} fontWeight={"bold"}>
									Minimum Bidding Price : {Intl.NumberFormat("en", { style: "currency", currency: "INR" }).format(props.minimumBid) }
							</Typography>
						</Grid>
					</Grid>
					<Grid item xs={12} container justifyContent={"left"} mt={3} ml={3} mr={3}>
						<Grid item container xs={12} justifyContent={"center"}>
							<Grid item>
								<LocalizationProvider dateAdapter={AdapterMoment}>
									<DateTimePicker
										renderInput={(params) => {
											return(
												<FormControl fullWidth>
													<TextField {...params} />
												</FormControl>);
										}}
										label="Bidding End Date and Time"
										value={props.bidEndTime}
										onChange={
											(newValue) => {
												props.setBidEndTime(newValue);
											}
										}
										minDateTime={moment()}
									/>
								</LocalizationProvider>
							</Grid>
						</Grid>
					</Grid>
					{
						(props.bidEndTime.unix() < moment().unix()+7200)?
							(<Grid item xs={12} ml={3} mr={3} mt={3}>
								<Stack direction="row" alignItems="center" gap={1}>
									<WarningIcon color={"warning"}/>
									<Typography textAlign={"left"} variant={"body1"}>Remaining time Should be at least 2hours</Typography>
								</Stack>
							</Grid>):
							(<Grid item xs={12} ></Grid>)
					}

					<Grid item xs={12} mr={3} mt={3} ml={3}>
						<FormControl fullWidth>
							<FormLabel required={true}>
									Minimum Bidding Price
							</FormLabel>
							<TextField
								name="minBid"
								value={props.minimumBid}
								type={"number"}
								required={true}
								onChange={onChangeMinBid}
								InputProps={{
									startAdornment: <InputAdornment position="start">₹</InputAdornment>,
								}}
								error={props.minimumBid<100}
							/>
						</FormControl>
					</Grid>
					{
						(props.minimumBid==""||props.minimumBid<100)?
							(<Grid item xs={12} mr={3} mt={3} ml={3}>
								<Stack direction="row" alignItems="center" gap={1}>
									<WarningIcon color={"warning"}/>
									<Typography textAlign={"left"} variant={"body1"}>Enter initial minimum bidding price of at least ₹ 100</Typography>
								</Stack>
							</Grid>):
							("")
					}

					<Grid item xs={12} mt={3} ml={3} mr={3}>
						<FormControl fullWidth>
							<FormLabel>
									Minimum Bid Step
							</FormLabel>
							<TextField
								name="minBidStep"
								value={props.minimumBidStep}
								type={"number"}
								required={true}
								onChange={onChangeMinBidStep}
								InputProps={{
									startAdornment: <InputAdornment position="start">₹</InputAdornment>,
								}}
							/>
						</FormControl>
					</Grid>
					{
						(props.minimumBid==""||props.minimumBid<10)?
							(<Grid item xs={12} m={3}>
								<Stack direction="row" alignItems="center" gap={1}>
									<InfoIcon color={"info"}/>
									<Typography textAlign={"left"} variant={"body1"}>Enter Minimum Bidding Price of more than 10 to add Minimum Bid Step</Typography>
								</Stack>
							</Grid>):
							(<Grid item xs={12} m={3}></Grid>)
					}
				</Grid>
			</Grid>
		</Grid>
	);
}

SetBiddingCard.propTypes = {
	onSubmit: PropTypes.bool,
	getValues: PropTypes.func,

	setMinimumBid: PropTypes.func.isRequired,
	setMinimumBidStep: PropTypes.func.isRequired,
	setBidEndTime: PropTypes.func.isRequired,

	minimumBid: PropTypes.any.isRequired,
	minimumBidStep: PropTypes.any.isRequired,
	bidEndTime: PropTypes.any.isRequired,
};

export default SetBiddingCard;
