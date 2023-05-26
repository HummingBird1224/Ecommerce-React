import Axios from "axios";
import authService from "./auth.service";

// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_URL;
const apiEndpoint = apiUrl;

export function getNoOfProducers(){
	const no = Axios.get(`${apiEndpoint}/guestUsers/noOfProducers`,{
		headers: { "x-auth-token": authService.getCurrentUser()
		}
	});
	return no;
}
export function getNoOfBuyers(){
	const no = Axios.get(`${apiEndpoint}/guestUsers/noOfBuyers`,{
		headers: { "x-auth-token": authService.getCurrentUser()
		}
	});
	return no;
}
export function getNoOfOfficers(){
	const no = Axios.get(`${apiEndpoint}/guestUsers/noOfOfficers`,{
		headers: { "x-auth-token": authService.getCurrentUser()
		}
	});
	return no;
}
