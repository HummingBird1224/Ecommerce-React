import Axios from "axios";

// eslint-disable-next-line no-undef
const apiUrl = process.env.REACT_APP_API_URL;
const apiEndpoint = apiUrl + "/cropTypes";

export function getCropTypes(){
	const cropTypes = Axios.get(`${apiEndpoint}`);
	return cropTypes;
}
export function getNoOfCropTypes(){
	const no = Axios.get(`${apiEndpoint}/getNoOfCrops`);
	return no;
}
export function getCropById(cropId){
	const cropData = Axios.get(`${apiEndpoint}/${cropId}`);
	return cropData;
}
export function getCropByName(cropName){
	const cropData = Axios.get(`${apiEndpoint}/getCropByName/${cropName}`);
	return cropData;
}
