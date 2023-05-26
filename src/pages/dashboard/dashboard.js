import React, { useEffect, useState } from "react";
import "./dashboard.module.css";
import "./boxstyle.css";
import Grid from "@mui/material/Grid";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import EventNoteIcon from "@mui/icons-material/EventNote";



import Video from "./video";
import Visualize from "./visualization";
import { getNoOfBuyers, getNoOfOfficers, getNoOfProducers } from "../../services/noOfUsers";
import { getNoOfCropTypes } from "../../services/croptypeServices";
import Tooltip from "../../components/tooltip/tooltip";
import BannerCard from "./BannerCard";
function Dashboard() {

	// states
	const [producerCount, setProducerCount] = useState();
	const [buyerCount, setBuyerCount] = useState();
	const [cropCount, setCropCount] = useState();
	const [officerCount, setOfficerCount] = useState();

	//data access from axios


	//function
	// eslint-disable-next-line no-mixed-spaces-and-tabs
	useEffect(() => {
		async function getUserCount() {
			const noProducers = await getNoOfProducers();
			const noBuyers = await getNoOfBuyers();
			const noCrops = await getNoOfCropTypes();
			const noOfficers = await getNoOfOfficers();
			setProducerCount(noProducers.data[0].id);
			setBuyerCount(noBuyers.data[0].id);
			setCropCount(noCrops.data[0].id);
			setOfficerCount(noOfficers.data[0].id);
		}
		getUserCount();
	}, []);


	return (

		<div>
			{/* <div className="carousel">
				<Video/>
			</div> */}
			<div style={{ display: "flex", justifyContent: "right", marginRight: "40px" }}>
				<Tooltip />
			</div>

			<Grid
				spacing={2}
				item container
				display="flex"
				justifyContent="space-around"
			>
				<BannerCard
					image="/marketplace.jpg"
					alt="marketplace"
					title="MARKETPLACE"
					content="Purchase directly from verified FPO/SHG  "
					href="marketplace"
					buttonContent="Enquire Now"
				/>
				<BannerCard
					image="/eauction.jpg"
					alt="eauction"
					title="e-AUCTIONS"
					content="Participate and place your bid in live e-auctions"
					href="eauctions"
					buttonContent="Participate Now"
				/>
				 <BannerCard
					image="/freestore.jpg"
					alt="eauction"
					title="FPO/SHG STORE"
					content="Don't have a shop to sell your goods?"
					href="https://frutri.com"
					buttonContent="Digital Store"
				/>

			</Grid>
			<div>
				<Grid container spacing={15} justifyContent="center" padding={5} >



					<Grid item xs={12} md={6} lg={3} align="center" >
						<Grid container spacing={1.5} justifyContent="center" sx={{ boxShadow: "5" }}>
							<Grid className="farmer" item xs={12} sx={{ fontSize: "40px", height: "150px" }}>
							</Grid>
							<Grid item xs={8} align="left" sx={{ fontSize: "40px", color: "green" }}>{producerCount}
							</Grid>
							<Grid item xs={4} align="center" sx={{ color: "black" }} >
								<GroupsIcon sx={{ fontSize: "40px", padding: "5px" }} />
							</Grid>
							<Grid item xs={12} align="left" sx={{ fontWeight: "800", fontFamily: "Montserrat", fontSize: "20px", color: "rgb(105,105,105)", backgroundColor: "rgb(124,252,0,0.5)" }}>
								FPO/SHG
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={12} md={6} lg={3} align="center" >
						<Grid container spacing={1.5} justifyContent="center" sx={{ boxShadow: "5" }}>
							<Grid className="buyer" item xs={12} sx={{ fontSize: "40px", height: "150px" }}>
							</Grid>
							<Grid item xs={8} align="left" sx={{ fontSize: "40px", color: "green" }}>{buyerCount}
							</Grid>
							<Grid item xs={4} align="center" sx={{ color: "black" }} >
								<PersonAddIcon sx={{ fontSize: "40px", padding: "5px" }} />
							</Grid>
							<Grid item xs={12} md={12} align="left" sx={{ fontWeight: "800", fontFamily: "Montserrat", fontSize: "20px", color: "rgb(105,105,105)", backgroundColor: "rgb(124,252,0,0.5)" }}>
								Buyers
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={12} md={6} lg={3} align="center" >
						<Grid container spacing={1.5} justifyContent="center" sx={{ boxShadow: "5" }}>
							<Grid className="crop" item xs={12} sx={{ fontSize: "40px", height: "150px" }}>
							</Grid>
							<Grid item xs={8} align="left" sx={{ fontSize: "40px", color: "green" }}>{cropCount}
							</Grid>
							<Grid item xs={4} align="center" sx={{ color: "black" }} >
								<EventNoteIcon sx={{ fontSize: "40px", padding: "5px" }} />
							</Grid>
							<Grid item xs={12} align="left" sx={{ fontWeight: "800", fontFamily: "Montserrat", fontSize: "20px", color: "rgb(105,105,105)", backgroundColor: "rgb(124,252,0,0.5)" }}>
								Crop types
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={12} md={6} lg={3} align="center" >
						<Grid container spacing={1.5} justifyContent="center" sx={{ boxShadow: "5" }}>
							<Grid className="officer" item xs={12} sx={{ fontSize: "40px", height: "150px" }}>
							</Grid>
							<Grid item xs={8} align="left" sx={{ fontSize: "40px", color: "green" }}>{officerCount}
							</Grid>
							<Grid item xs={4} align="center" sx={{ color: "black" }} >
								<EventNoteIcon sx={{ fontSize: "40px", padding: "5px" }} />
							</Grid>
							<Grid item xs={12} align="left" sx={{ fontWeight: "800", fontFamily: "Montserrat", fontSize: "20px", color: "rgb(105,105,105)", backgroundColor: "rgb(124,252,0,0.5)" }}>
								Officers
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Visualize />
			</div>
		</div>
	);
}


export default Dashboard;
