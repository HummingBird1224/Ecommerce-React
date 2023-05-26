import Axios from "axios";
import authService from "./auth.service";

// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_URL;
const apiEndpoint = apiUrl + "/items";
const apiEndpointProducer = apiUrl + "/producerUsers/items";
const apiEndpointBuyer = apiUrl + "/buyerUsers/items";

export function getAllItems(){
	const items = Axios.get(`${apiEndpoint}`);
	return items;
}

export function getProducerAllListingss(){
	const items = Axios.get(`${apiEndpointProducer}/${authService.getCurrentUserId()}`,{
		headers: { "x-auth-token": authService.getCurrentUser()}
	});
	return items;
}

export function getItemById(itemId){
	const itemData = Axios.get(`${apiEndpoint}/${itemId}`);
	return itemData;
}

export function buyerSetBidForItem(itemId, data){
	const itemData = Axios.put(
		`${apiEndpointBuyer}/set-bid/${itemId}`,
		{data},
		{
			headers: { "x-auth-token": authService.getCurrentUser()}
		}
	);
	return itemData;
}

export function producerAddListing(data){
	const itemData = Axios.post(
		`${apiEndpointProducer}/add-item`,
		{data},
		{
			headers: { "x-auth-token": authService.getCurrentUser()}
		}
	);
	return itemData;
}
