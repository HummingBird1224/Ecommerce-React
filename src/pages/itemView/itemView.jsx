import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Breadcrumbs, CircularProgress, Grid, Typography} from "@mui/material";
import ItemViewCard from "./itemViewCard";
import ItemBiddingCard from "./itemBiddingCard";
import NotFound from "../notFound";
import {getItemById} from "../../services/itemServices";
import PropTypes from "prop-types";

function ItemView(props){
	const [isLoading, setLoading] = useState(true);
	const [item, setItem] = useState();
	const [isRefresh, setIsRefresh] = useState(false);
	const itemId = useParams().itemId;
	useEffect(()=>{
		async function getItem(){
			const data = await getItemById(itemId);
			setItem(data.data);
			setLoading(false);
		}
		getItem();
	},[isRefresh]);

	const refreshPageDetails = ()=>{
		setIsRefresh(!isRefresh);
		window.location.reload();
	};

	let breadcrumbs = null;
	if(props.user===0){
		breadcrumbs = [
			<Link to={"/producer"} key={1} style={{textDecoration: "none" ,color:"black"}}>
				MY DASHBOARD
			</Link>,
			<Typography key="3" color="primary">
				MY LISTING VIEW (ID: {itemId})
			</Typography>,
		];
	}else if(props.user===1){
		breadcrumbs = [
			<Link to={"/buyer/marketplace"} key={1} style={{textDecoration: "none" ,color:"black"}}>
				MARKETPLACE
			</Link>,
			<Typography key="3" color="primary">
				BIDDING VIEW (ID: {itemId})
			</Typography>,
		];
	}

	// If No valid Item
	if(item === "NoItem"){
		return (
			<Grid item align="center" height={1600} xs={12}>
				<NotFound/>
			</Grid>
		);
	}

	if (isLoading){
		return (
			<Grid item align="center" height={1600} xs={12} data-testid={"Itemview"}>
				<CircularProgress />
			</Grid>
		);
	}

	console.log(item);
	return(
		<Grid container data-testid={"Itemview"} justifyContent={"center"}>
			<Grid item container spacing={3}  maxWidth={1200} p={3}>
				<Grid item md={12} maxHeight={50}>
					<Breadcrumbs separator="›" aria-label="breadcrumb">
						{breadcrumbs}
					</Breadcrumbs>
				</Grid>
				<Grid item md={6} xs={12}  minHeight={400} container>
					<ItemViewCard cropData = {
						{
							images: item.images
						}
					}/>
				</Grid>
				<Grid item md={6} xs={12}>
					<ItemBiddingCard
						refreshPageDetails={refreshPageDetails}
						biddingData={
							{
								name: item.name,
								endTime: item.bid_end_time,
								bidArray: item.bidding_array,
								itemId: item._id,
								minimumBid: item.minimum_bid,
								description: item.description,
								quantity: item.quantity,
								location: item.location,
								bidStep:item.minimum_bid_step,
								crop: item.crop
							}
						}
						user={props.user}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
}

ItemView.propTypes = {
	user: PropTypes.number.isRequired
};

export default ItemView;
