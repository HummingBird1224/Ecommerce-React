import Axios from "axios";

// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_URL;
const apiEndpoint = apiUrl + "/districtDetails";

export function getDistrictDetails(){
	const districts = Axios.get(`${apiEndpoint}`);
	return districts;
}
