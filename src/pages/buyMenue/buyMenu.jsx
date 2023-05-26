import React, {useEffect, useState} from "react";
import {CircularProgress, Grid, Typography} from "@mui/material";
import BuyMenuTable from "./buyMenuTable";
// eslint-disable-next-line no-unused-vars
import { getAllOrdersForBuyer, getAllOrdersForProducer} from "../../services/orderServices";
import authService from "../../services/auth.service";

function BuyMenu(){
	const [orderArray, setOrderArray] = useState([]);
	const [orderFinalArray, setOrderFinalArray] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(()=>{

		getOrders();
		setLoading(false);
	},[]);

	useEffect(()=>{
		setupData();
	},[orderArray]);

	async function getOrders(){
		const userType = await authService.getCurrentUserType();
		const userId = await authService.getCurrentUserId();
		console.log(userType,userId);
		if(userType==1){
			const {data} = await getAllOrdersForBuyer(userId);
			setOrderArray(data);
			return;
		}else if(userType==0){
			const {data} = await getAllOrdersForProducer(userId);
			setOrderArray(data);
			return;
		}
	}

	function setupData(){
		const modifiedData = orderArray.map((order)=>{
			return  {
				"id": order._id,
				"paymentStatus": order.payment_status,
				"payment": order.order_price,
				"deliveryStatus": order.delivery_status
			};
		});
		setOrderFinalArray(modifiedData);
	}

	function renderMain(){
		if(isLoading){
			return(
				<CircularProgress/>
			);
		}
		return (
			<BuyMenuTable data={orderFinalArray} />
		);
	}

	return(
		<Grid container justifyContent={"center"} direction={"column"} spacing={3}>
			<Grid item xs={12} mt={3}>
				<Typography variant={"h3"} textAlign={"center"}>
					MY ORDERS
				</Typography>
			</Grid>
			<Grid item xs={12} minHeight={1000} data-testid={"BuyMenu"}>
				{renderMain()}
			</Grid>
		</Grid>
	);
}

export default BuyMenu;
