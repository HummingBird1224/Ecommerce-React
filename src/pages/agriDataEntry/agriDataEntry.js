/* eslint-disable no-mixed-spaces-and-tabs */
import React, {useEffect, useState} from "react";
import "./agridataentry.module.css";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";
import { Alert } from "@mui/material";
import {Divider} from "@mui/material";
import SelectInput from "../../components/selectInput/selectInput";
import TextInput from "../../components/textInput/textInput";
import {getAllStates, getDistrictById, getDistrictByName} from "../../services/stateServices";
import {getCropByName, getCropTypes} from "../../services/croptypeServices";
import {addData} from "../../services/agridataServices";
import * as XLSX from "xlsx";

function AgriDataEntry(){

	// states
	const [fieldDistrict,setFieldDistrict] = useState();
	const [errcount,setErrCount] = useState(0);
	const [fileData,setFileData] = useState([]);
	const [districts,setDistricts] = useState([]);
	const [fieldCity,setFieldCity] = useState();
	const [f_City,setF_City] = useState();
	const [cropTypes,setCropTypes] = useState([]);
	const [croptype,setCroptype] = useState();
	const [cropAmount,setCropAmount] = useState();
	const [year,setYear] = useState();
	const [error,setError] = useState();
	const [success,setSuccess] = useState();
	const [fileerror,setFileError] = useState();
	const [filesuccess,setFileSuccess] = useState();
	const [fileerrhidden,setFileErrHidden] = useState(true);
	const [filesuchidden,setFileSucHidden] = useState(true);
	const [errhidden,setErrHidden] = useState(true);
	const [suchidden,setSucHidden] = useState(true);

	const [cityList,setCityList]=useState([]);


	//data access from axios
	useEffect(()=>{
		async function getDistrictList(){
			const district_names = await getAllStates();
			setDistricts(district_names.data.districtList);
		}

		getDistrictList();
		async function getCrops(){
			const crop_names = await getCropTypes();
			setCropTypes(crop_names.data);
		}
		getCrops();

	},[]);

	//function
	async function handleFile(e) {
		setFileErrHidden(true);
		setFileSucHidden(true);
		setErrHidden(true);
		setSucHidden(true);
		setErrCount(0);
		const file = e.target.files[0];
		const data = await file.arrayBuffer();
		const workbook = XLSX.read(data);

		const worksheet = workbook.Sheets[workbook.SheetNames[0]];
		const jsondata = XLSX.utils.sheet_to_json(worksheet);

		const data_list = jsondata.map((agri_data) => ({
			year: agri_data.Year,
			cropType: agri_data.Crop_type,
			cropAmount: agri_data.Amount,
			district: agri_data.District,
			city: agri_data.City
		}));

		setFileData(data_list);
	}
	async function handleSubmitFile() {
		setErrHidden(true);
		setSucHidden(true);
		setFileErrHidden(true);
		setFileSucHidden(true);
		if(fileData.length === 0){
			setFileError("Please select a file");
			setFileErrHidden(false);
		}
		else {
			for (let i = 0; i < fileData.length; i++) {
				const dist = await getDistrictByName(fileData[i].district);
				const crop = await getCropByName(fileData[i].cropType);

				if((dist.data[0] === undefined) || (crop.data[0] === undefined) ){
					setErrCount(1);
				}
				else {
					const district_id = dist.data[0]._id;
					const crop_id = crop.data[0]._id;

					const agriDataBody = {
						year:(fileData[i].year).toString(),
						cropType: crop_id,
						district: district_id,
						city: fileData[i].city,
						cropAmount: fileData[i].cropAmount
					};
					postData(agriDataBody);

				}

			}
			if(errcount !== 0){
				setFileError("Failed to add some entries!");
				setFileErrHidden(false);
			}
			else {
				setFileSuccess("Data entries added successfully!");
				setFileSucHidden(false);
			}
		}

	}
	async function onChange(event) {
		if (event.target.name === "cropAmount") {
			setCropAmount(event.target.value);
		} else if (event.target.name === "fieldDistrict") {
			setFieldDistrict(event.target.value);
			const cities = await getDistrictById(event.target.value);
			const city_list = cities.data.cities.map((city,index) => ({
				_id: index,
				name: city,
			}));
			setCityList(city_list);

		} else if (event.target.name === "fieldCity") {
			setFieldCity(event.target.value);
			setF_City(cityList[event.target.value].name);
		} else if (event.target.name === "cropTypes") {
			setCroptype(event.target.value);
		} else if (event.target.name === "year") {
			setYear(event.target.value);
		}
		setErrHidden(true);
		setSucHidden(true);
	}

	function validateNonEmpty(text){
		return text !== "" && text !== undefined;
	}

	function validateNonEmptyArray(list){
		return (list !== undefined);
	}

	function handleCancel(){
		window.location.assign("/officer/agridatamanage");
	}
	async function postData(data){
		const agriData = await addData(data);
		return agriData;
	}

	function handleSubmit(){
		setErrHidden(true);
		setSucHidden(true);
		if ((!validateNonEmptyArray(croptype)) || (!validateNonEmptyArray(fieldDistrict)) || (!validateNonEmptyArray(fieldCity)) || (!validateNonEmpty(cropAmount)) || (!validateNonEmpty(year)) ){
			setError("Fill all fields!");
			setErrHidden(false);
		}
		else{
			const agriDataBody = {
				year:year,
				cropType: croptype,
				district: fieldDistrict,
				city: f_City,
				cropAmount: cropAmount
			};
			// eslint-disable-next-line no-undef
			postData(agriDataBody);
			setSuccess("Data added successfully!");
			setSucHidden(false);

			setCropAmount([]);
			setYear([]);

			setFieldDistrict(null);
			setFieldCity(null);
			setCroptype(null);

		}

	}

	return(
		<Container>
			<Grid container>
				<Grid item xs={12}>
					<Typography variant="h2"><span style={{color: "green"}}>Add Agriculture</span> Data</Typography>
					<hr />
				</Grid>

				<Grid item xs={12} hidden={errhidden}>
					<Alert severity="error" >{error}</Alert>
				</Grid>
				<Grid item xs={12} hidden={suchidden}>
					<Alert severity="success">{success}</Alert>
				</Grid>

				<Grid item xs={12}>
					<Typography variant="h5" m={1}>Crop Details</Typography>
					<Divider />
					<Paper variant="elevation" elevation={3}>
						<Grid container mt={2} spacing={2} padding={2}>
							<Grid item xs={12} >
								{/* eslint-disable-next-line react/prop-types */}

								<SelectInput name="fieldDistrict" label="Field District" value={fieldDistrict} onChange={onChange} required={true} options={districts} multi={false}/>
							</Grid>
							<Grid item xs={12} >
								{/* eslint-disable-next-line react/prop-types */}
								<SelectInput name="fieldCity" label="Field City" value={fieldCity} onChange={onChange} required={true} options={cityList} multi={false}/>
							</Grid>
							<Grid item xs={12} >
								{/* eslint-disable-next-line react/prop-types */}
								<SelectInput name="cropTypes" label="Crop Type" value={croptype} onChange={onChange} required={true} options={cropTypes} multi={false}/>
							</Grid>
							<Grid item xs={12} >
								{/* eslint-disable-next-line react/prop-types */}
								<TextInput name="cropAmount" label="Crop Amount" value={cropAmount} onChange={onChange} required={true}/>
							</Grid>
							<Grid item xs={12} >
								{/* eslint-disable-next-line react/prop-types */}
								<TextInput name="year" label="Year" value={year} onChange={onChange} required={true}/>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={12} mt={1} align="right">
					<Button type="submit" sx={{m:1}} variant="contained" onClick={handleCancel}>Cancel</Button>
					<Button type="submit" sx={{m:1}} variant="contained" onClick={handleSubmit}>Submit</Button>
				</Grid>

				<Grid item xs={12}>
					<Typography variant="h5" m={1}>Add data from file</Typography>
					<Divider />
					<Grid item xs={12} hidden={fileerrhidden}>
						<Alert severity="error" >{fileerror}</Alert>
					</Grid>
					<Grid item xs={12} hidden={filesuchidden}>
						<Alert severity="success">{filesuccess}</Alert>
					</Grid>
					<Paper variant="elevation" elevation={3}>
						<Grid container mt={2} spacing={2} padding={2}>
							<Grid item xs={6} >
								{/* eslint-disable-next-line react/prop-types */}
								<input type="file" onChange={(e)=> handleFile(e)}/>
							</Grid>
							<Grid item xs={6} mt={1} align="right">
								<Button type="submit" sx={{m:1, marginTop:-2}} variant="contained" onClick={handleSubmitFile}>Submit</Button>
							</Grid>
						</Grid>
					</Paper>
				</Grid>

			</Grid>
		</Container>

	);
}
export default AgriDataEntry;
