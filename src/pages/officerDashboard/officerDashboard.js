import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Barchart from "../../components/Charts/Barchart";
import Linechart from "../../components/Charts/Linechart";
import Piechart from "../../components/Charts/Piechart";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import GroupsIcon from "@mui/icons-material/Groups";
import GrassIcon from "@mui/icons-material/Grass";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import Districtimg from "../../img/district.png";

function OfficerDashboard(){
	return(
		<div>
			<div>
				<Grid container spacing={5} justifyContent="center" >
					<Grid item xs={12} md={3.5} align="center">
						<Card sx={{ minWidth: 275 }}>
							<CardContent>
								<Typography component="div">
									<GroupsIcon fontSize={"large"}/>
								</Typography>
								<Typography variant="h6" component="div">
											Total Farmers in the District
								</Typography>
								<Typography variant="h5" component="div" color={"green"}>
											68
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} md={3.5} align="center">
						<Card sx={{ minWidth: 275 }}>
							<CardContent>
								<Typography component="div">
									<GrassIcon fontSize={"large"}/>
								</Typography>
								<Typography variant="h6" component="div">
											Total Number of crop types
								</Typography>
								<Typography variant="h5" component="div" color={"green"}>
											12
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} md={3.5} align="center">
						<Card sx={{ minWidth: 275 }}>
							<CardContent>
								<Typography component="div">
									<AgricultureIcon fontSize={"large"}/>
								</Typography>
								<Typography variant="h6" component="div">
											Estimated crop harvest
								</Typography>
								<Typography variant="h5" component="div" color={"green"}>
											800
								</Typography>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} md={3.5} align={"center"}>
						<Paper >
							<h2>Anuradhapura District</h2>
							<img src={Districtimg} alt="district" width={"200px"}/>
						</Paper>
					</Grid>
					<Grid item xs={12} md={6.2} marginTop={"20px"} >
						<Paper >
							<Linechart/>
						</Paper>
					</Grid>
					<Grid item xs={12} md={3.5} >
						<Paper >
							<Piechart/>
						</Paper>
					</Grid>
					<Grid item xs={12} md={6.7} >
						<Paper>
							<Barchart/>
						</Paper>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}

export default OfficerDashboard;
