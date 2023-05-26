import Axios from "axios";
import authService from "./auth.service";

// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_URL;
const apiEndpoint = apiUrl + "/marketItems";
const apiEndpointProducer = apiUrl + "/ProducerUsers/marketItem";
const apiEndpointBuyer = apiUrl + "/buyerUsers/marketItem";

export function getAllMarketItems(){
	const items = Axios.get(`${apiEndpoint}`);
	return items;
}

export function producerAddMarketItem(data) {
	const itemData = Axios.post(
		`${apiEndpointProducer}/addNew`,
		data,
		{
			headers: { "x-auth-token": authService.getCurrentUser() }
		}
	);
	return itemData;
}

export function getProducerAllMarketItems() {
	const items = Axios.get(`${apiEndpointProducer}/all/${authService.getCurrentUserId()}`, {
		headers: { "x-auth-token": authService.getCurrentUser() }
	});
	return items;
}

export function getMarketItemById(itemId) {
	const item = Axios.get(`${apiEndpoint}/${itemId}`);
	return item;
}

export function sendEnquiry(data) {
	const enquiry = Axios.post(
		`${apiEndpoint}/enquiry `,
		data
	);
	return enquiry;
}

