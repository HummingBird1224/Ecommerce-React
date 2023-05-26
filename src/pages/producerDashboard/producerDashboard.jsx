import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
// eslint-disable-next-line no-unused-vars
import { CircularProgress, Divider } from "@mui/material";
import ProducerItems from "./producerItems";
// import ProducerSales from "./producerSales";
import authService from "../../services/auth.service";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { LinkedButtonRound } from "../../components/button/button";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ProducerMarketItems from "./producerMarketItems";


function ProducerDashboard() {
	// eslint-disable-next-line no-unused-vars
	const [isLoading, setLoading] = useState(true);
	// eslint-disable-next-line no-unused-vars
	const [myListings, setMyListing] = useState([]);

	useEffect(() => {
		setLoading(false);
	}, []);

	function renderMyListing() {
		if (isLoading) {
			return (
				<Paper>
					<Grid container height={400} alignItems={"center"} justifyContent={"center"}>
						<Grid item>
							<CircularProgress />
						</Grid>
					</Grid>
				</Paper>
			);
		} else {
			return (
				<Paper>
					<ProducerItems />
				</Paper>
			);
		}
	}
	function renderMarketItems() {
		if (isLoading) {
			return (
				<Paper>
					<Grid container height={400} alignItems={"center"} justifyContent={"center"}>
						<Grid item>
							<CircularProgress />
						</Grid>
					</Grid>
				</Paper>
			);
		} else {
			return (
				<Paper>
					<ProducerMarketItems />
				</Paper>
			);
		}
	}

	function renderAddItemButton() {
		return (
			<>
				<AddCircleIcon /> Sell in e-Auction
			</>
		);
	}

	return (
		<Container >
			<Grid container align={"center"}>
				<Grid item xs={12}>
					<Typography variant="h4">
						<span style={{ color: "green" }}>
							Sell in Marketplace
						</span>
					</Typography>
					<hr />
				</Grid>

				<Grid item xs={12} p={2} textAlign={"right"}>
					<Link
						to={'addmarketitem'}
						style={{ textDecoration: "none" }}
					>
						<Button
							variant={"contained"}
							size={"large"}
							sx={
								{
									color: "white",
									fontWeight: "bold",
									borderRadius: "100px"
								}
							}
							color="primary"
						>
							Sell in Marketplace
						</Button>
					</Link>
				</Grid>

				<Grid
					item xs={12}
					mb={10}
				>
					{renderMarketItems()}
				</Grid>
				{/*<Grid item xs={12}>*/}
				{/*	<Typography variant="h5" m={1}>Crop sales</Typography>*/}
				{/*	<Divider />*/}
				{/*	<Paper>*/}
				{/*		/!*<ProducerSales/>*!/*/}
				{/*	</Paper>*/}
				{/*</Grid>*/}
				<Grid item xs={12}>
					<Typography variant="h4">
						<span style={{ color: "green" }}>
							Sell in e-Auction
						</span>
					</Typography>
					<hr />
				</Grid>

				<Grid item xs={12} p={2} textAlign={"right"}>
					<LinkedButtonRound
						href={"add-item"}
						content={renderAddItemButton()}
					/>
				</Grid>

				<Grid

					item xs={12}
				// height={1000}
				>
					{renderMyListing()}
				</Grid>
			</Grid>
		</Container>
	);
}

export default ProducerDashboard;
