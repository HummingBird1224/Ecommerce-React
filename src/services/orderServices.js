import Axios from "axios";
import authService from "./auth.service";

// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_URL;
// const apiEndpoint = apiUrl + "/orders";
const apiEndpointPublicUser = apiUrl + "/publicUsers";
const apiEndpointProducer = apiUrl + "/producerUsers";
const apiEndpointBuyer = apiUrl + "/buyerUsers";

export function getAllOrdersForBuyer(buyerId){
	const orders = Axios.get(
		`${apiEndpointBuyer}/order-by-buyerId/${buyerId}`,
		{
			headers: { "x-auth-token": authService.getCurrentUser()}
		});
	return orders;
}
export function getAllOrdersForProducer(producerId){
	const orders = Axios.get(
		`${apiEndpointProducer}/order-by-producerId/${producerId}`,
		{
			headers: { "x-auth-token": authService.getCurrentUser()}
		});
	return orders;
}
export function getOrderByIdForPublicUser(orderId){
	const orders = Axios.get(
		`${apiEndpointPublicUser}/get-order/${orderId}`,
		{
			headers: { "x-auth-token": authService.getCurrentUser()}
		}
	);
	return orders;
}
export function updateOrderDeliveryStatus(orderId, status){
	const orders = Axios.put(
		`${apiEndpointProducer}/update/delivery-status/${orderId}`,
		{status},
		{
			headers: { "x-auth-token": authService.getCurrentUser()}
		});
	return orders;
}

export function updateOrderPayment(data){
	const orders = Axios.put(
		`${apiEndpointBuyer}/update/payment`,
		{data},
		{
			headers: { "x-auth-token": authService.getCurrentUser()}
		});
	return orders;
}

