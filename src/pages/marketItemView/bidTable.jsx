import React, {useEffect, useState} from "react";
import CustomTable from "../../components/customTable/customTable";
import {Grid, Typography} from "@mui/material";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import authService from "../../services/auth.service";
import moment from "moment";

function BidTable(props){
	const initialBidArr = props.bidderArray;
	const [bidderArray, setBidArray] = useState(initialBidArr);
	useEffect(()=>{
		if(initialBidArr.length!=0){
			setBidArray(initialBidArr);
		}
	},[initialBidArr]);
	const columns = [
		{ field: "bidTime", headerName: "Timestamp", width: 200 },
		{ field: "bidderName", headerName: "Bidder", width: 200 },
		{ field: "bidAmount", headerName: "Bid Amount", width: 200}
	];

	const rows = bidderArray.map((item)=>{
		return {
			"id": item._id,
			"bidTime": moment(item.time_stamp).format("yyyy/MM/DD HH:mm:ss Z"),
			"bidderName": (authService.getCurrentUserType()==3||
				authService.getCurrentUserType()==4)||
			authService.getCurrentUserId()==item.bidder._id?
				item.bidder.userName+" (You)":
				"*Buyer Identity Protected",
			"bidAmount": item.bid_amount
		};
	});

	const noItemOverlay = ()=>{
		return(
			<Grid item align="center"  xs={12} minHeight={1200}>
				<Typography variant={"h5"}>
					No Biddings Available
				</Typography>
				<img height={250} src={"https://www.creativefabrica.com/wp-content/uploads/2021/01/04/Mustard-Sad-Vegetable-Cute-Kawaii-Graphics-7557389-1.jpg"}/>
			</Grid>
		);
	};

	return(
		<Grid>
			<Paper>
				<CustomTable
					rows={rows}
					columns={columns}
					disableToolBar={true}
					preSortUsing={
						{field:"bidTime", sort:"desc"}
					}
					customNoRowsOverlay={noItemOverlay()}
				/>
			</Paper>
		</Grid>
	);
}

BidTable.propTypes = {
	bidderArray: PropTypes.array.isRequired,
	user: PropTypes.number.isRequired
};

export default BidTable;
