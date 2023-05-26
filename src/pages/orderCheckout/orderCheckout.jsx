import React, {useEffect, useState} from "react";
import Checkout from "./checkout";
import {useParams} from "react-router-dom";
import {getOrderByIdForPublicUser} from "../../services/orderServices";
import {CircularProgress, Grid} from "@mui/material";
import NotFound from "../notFound";

export default function OrderCheckout(){
	const {id} = useParams();
	const [order, setOrder] = useState(null);
	const [isLoading, setLoading] = useState(true);
	useEffect(()=>{
		const orderDetails = async ()=>{
			console.log("ordercheckout" , id);
			const {data} = await getOrderByIdForPublicUser(id);
			setOrder(data);
			setLoading(false);
		};
		orderDetails();
		
	}, [id , isLoading]);

	if(isLoading){
		return (
			<Grid container justifyContent={"center"} height={1000}>
				<Grid item>
					<CircularProgress/>
				</Grid>
			</Grid>
		);
	}
	else if(order!=null && !isLoading){
		return(
			<Checkout order={order} />
		);
	}else {
		return(
			<NotFound/>
		);
	}

}
