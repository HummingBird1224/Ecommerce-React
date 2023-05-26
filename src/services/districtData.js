import Axios from "axios";

// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_URL;
const apiEndpoint = apiUrl + "/districtDatas";

export function getDistrictData(){
	const agriData = Axios.get(`${apiEndpoint}`);
	return agriData;
}
export function addDistrictData(data){
	const Data = Axios.post(`${apiEndpoint}`, {data});
	return Data;
}
export function deleteDistrictData(id){
	Axios.delete(`${apiEndpoint}/${id}`);
}

