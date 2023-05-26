import Axios from "axios";
import authService from "./auth.service";

// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_URL;
const apiEndpoint = apiUrl;

export function getAgriData(){
	const agriData = Axios.get(`${apiEndpoint}/guestUsers/getAllDataEntry`,{
		headers: { "x-auth-token": authService.getCurrentUser()
		}
	});
	return agriData;
}

export function getDistrictDetails(){
	const agriData = Axios.get(`${apiEndpoint}/guestUsers/districtDetails`, {
		headers: { "x-auth-token": authService.getCurrentUser()
		}
	});
	return agriData;
}

export function getCropDetails(){
	const agriData = Axios.get(`${apiEndpoint}/guestUsers/cropDetails`, {
		headers: { "x-auth-token": authService.getCurrentUser()
		}
	});
	return agriData;
}

export function addData(data){
	const Data = Axios.post(`${apiEndpoint}/officerUsers/addDataEntry`, {data}, {
		headers: { "x-auth-token": authService.getCurrentUser()
		}
	});
	return Data;
}
export function deleteData(id){
	Axios.delete(`${apiEndpoint}/officerUsers/deleteDataById/${id}`, {
		headers: { "x-auth-token": authService.getCurrentUser()
		}
	});
}


