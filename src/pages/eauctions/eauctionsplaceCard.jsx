import React, { useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { LinkedButtonRound } from "../../components/button/button";
import moment from "moment";
import authService from "../../services/auth.service";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ModalSignin from "./ModalSignin";

function EauctionsplaceCard(props) {

	const [open, setOpen] = useState(false);

	const {
		imgSrc,
		itemName,
		minBid,
		quantity,
		itemId,
		state,
		district,
		endTime,
		crop
	} = props;
	const currentTime = moment().unix();
	const endTimeInUnix = moment(endTime).unix();
	const type = authService.getCurrentUserType();
	const navigate = useNavigate()


	 function handleSubmit() {
		 authService.logout()
		navigate("/auth/login")
		setOpen(false);
	}
	function handleClose() {
		setOpen(false);
	}


	return (
		<Grid item>
			<Paper elevation={2} sx={{ borderRadius: "10px" }}>
				<Grid container border={0} borderRadius={2} >
					<Grid item xs={12} container justifyContent={"center"} mt={0.5}>
						<Grid item xs={12} ml={0.5} mr={0.5}>
							<Paper
								elevation={0}
								style={
									{
										borderRadius: "10px",
										backgroundImage: imgSrc == null ? `url(${"https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640"})` : `url(${imgSrc})`,
										backgroundSize: "cover",
										backgroundPosition: "center",
										backgroundRepeat: "no-repeat"
									}
								} >
								<Grid height={300} width={200} />
							</Paper>
						</Grid>
					</Grid>
					<Grid item xs={12} container>
						<Grid item xs={12} mt={1}>
							<Typography variant={"h5"} align={"center"}>
								{itemName}
							</Typography>
						</Grid>
						<Grid item xs={12} mt={1} mb={1}>
							<Typography variant={"body1"} align={"center"} fontWeight={"bold"}>
								Crop Type : {crop}
							</Typography>
						</Grid>
						<Grid item xs={12} mt={1} mb={1}>
							<Typography variant={"body1"} align={"center"} fontWeight={"bold"}>
								Quantity : {quantity} kg
							</Typography>
						</Grid>
						<Grid item xs={12} mt={1} mb={1}>
							<Typography variant={"body1"} align={"center"} fontWeight={"bold"}>
								State : {state}
							</Typography>
						</Grid>
						<Grid item xs={12} mt={1} mb={1}>
							<Typography variant={"body1"} align={"center"} fontWeight={"bold"}>
								District : {district}
							</Typography>
						</Grid>

						{
							currentTime > endTimeInUnix
								? (<Grid item xs={12} mt={1}>
									<Typography variant={"h5"} align={"center"} fontWeight={"bolder"}>
										Bid Ended
									</Typography>
								</Grid>)
								: (<Grid item xs={12} mt={1}>
									<Typography variant={"h5"} align={"center"} fontWeight={"bolder"}>
										{Intl.NumberFormat("en", { style: "currency", currency: "INR" }).format(minBid)}
									</Typography>
								</Grid>)
						}
						<Grid item xs={12} mt={2} mb={2} container justifyContent={"center"}>
							<Grid item >
								<Button
									variant={"contained"}
									size={"large"}
									sx={{
										color: "white",
										fontWeight: "bold",
										borderRadius: "100px"
									}}
									color={endTimeInUnix < currentTime
										? "error"
										: "primary"}
									onClick={() => {
										type === 1
											? navigate(`${itemId}`)
											: setOpen(true)
									}}
								>
									{endTimeInUnix < currentTime
										? "View"
										: "Bid"
									}
								</Button>
							</Grid>
							<Grid item xs={12}>
								<ModalSignin
									handleSubmit={handleSubmit}
									open={open}
									handleClose={handleClose}
									title={"Login Required"}
									content={"Please login as a Buyer before submitting a bid"}
								/>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</Grid>

	);
}

EauctionsplaceCard.propTypes = {
	imgSrc: PropTypes.string,
	itemName: PropTypes.string.isRequired,
	state: PropTypes.string.isRequired,
	district: PropTypes.string.isRequired,
	minBid: PropTypes.number.isRequired,
	quantity: PropTypes.number.isRequired,
	itemId: PropTypes.string.isRequired,
	endTime: PropTypes.any,
	crop: PropTypes.string,
	open: PropTypes.bool
};

export default EauctionsplaceCard;
