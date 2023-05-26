import Axios from "axios";
import authService from "./auth.service";

// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_URL;
const apiEndpoint = apiUrl;

export function getAllStates(){
	const states = Axios.get(`${apiEndpoint}/guestUsers/getAllStates`, {
		headers: { "x-auth-token": authService.getCurrentUser()
		}
	});
	return states;
}

export function getDistrictById(districtId){
	const districtData = Axios.get(`${apiEndpoint}/guestUsers/getDistrictById/${districtId}`, {
		headers: { "x-auth-token": authService.getCurrentUser()
		}
	});
	return districtData;
}

export function getDistrictByName(districtName){
	const district = Axios.get(`${apiEndpoint}/guestUsers/getDistrictByName/${districtName}`, {
		headers: { "x-auth-token": authService.getCurrentUser()
		}
	});
	return district;
}
