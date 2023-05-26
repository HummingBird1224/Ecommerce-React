import React from "react";
import {Breadcrumbs, Grid, Paper, Typography} from "@mui/material";
import SetBiddingCard from "../addItem/setBiddingCard";
import {Link} from "react-router-dom";
import EditItemDetailsForm from "./editItemDetailsForm";

function EditItem(){
	const itemId = 1;
	const breadcrumbs = [
		<Link to={"/marketplace"} key={1} style={{textDecoration: "none" ,color:"black"}}>
			MY CROPS
		</Link>,
		<Typography key="3" color="primary">
			EDIT ITEM (ID: {itemId})
		</Typography>,
	];

	return(
		<Grid container spacing={3} p={5}>
			<Grid item md={12} maxHeight={50}>
				<Breadcrumbs separator="›" aria-label="breadcrumb">
					{breadcrumbs}
				</Breadcrumbs>
			</Grid>
			<Grid item md={6} xs={12} minHeight={400} container>
				<Paper elevation={4}>
					<EditItemDetailsForm/>
				</Paper>
			</Grid>
			<Grid item md={6} xs={12} minHeight={400} container>
				<Paper elevation={4}>
					<SetBiddingCard/>
				</Paper>
			</Grid>
		</Grid>
	);
}

export default EditItem;
