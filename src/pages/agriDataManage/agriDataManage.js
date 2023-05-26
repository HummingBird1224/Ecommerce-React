/* eslint-disable no-mixed-spaces-and-tabs */
import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "reactjs-popup/dist/index.css";
import {Divider} from "@mui/material";
import AgriDataTable from "./agriDataTable";
import Button from "@mui/material/Button";


function AgriDataManage(){

	// states


	//data access from axios

	//function
	function handleAddData(){
		window.location.assign("agridatamanage/agridataentry");

	}


	return(
		<Container>
			<Grid container>
				<Grid item xs={12}>
					<Typography variant="h2"><span style={{color: "green"}}>Manage Agriculture</span> Data</Typography>
					<hr />
				</Grid>
				<Grid item xs={12} mt={1} align="right">
					<Button type="submit" sx={{m:1}} onClick={handleAddData} variant="contained">Add new data</Button>
				</Grid>
				<Grid item xs={12}>
					<AgriDataTable/>
					<Divider />
				</Grid>
			</Grid>
		</Container>

	);
}

export default AgriDataManage;
