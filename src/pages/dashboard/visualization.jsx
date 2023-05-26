import React, {useEffect, useState} from "react";
import "./dashboard.module.css";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Map from "../../components/map/map";
import Bargraph from "../../components/Charts/Bargraph";
import Linegraph from "../../components/Charts/Linegraph";
import Donutgraph from "../../components/Charts/Donutgraph";
import "@fontsource/montserrat";
import "./visualization.css";
import {getCropById, getCropTypes} from "../../services/croptypeServices";
import SelectInput from "../../components/selectInput/selectInput";
import {getDistrictById} from "../../services/stateServices";
import {getCropDetails, getDistrictDetails} from "../../services/agridataServices";

function Visualization(){

	// states
	const [cropTypes, setCropTypes] = useState([]);
	const [pieState, setPieState] = useState({

		labels: ["Types of Crops"],
		datasets: [{
			label: "Crop amounts around the country",
			backgroundColor: "rgba(54,255,0,0.71)",
			borderColor: "rgb(22,96,0)",
			borderWidth: 2,
			data: [0, 0, 0]

		}]
	});
	const [cropData, setCropData] = useState([]);
	const [districtObject, setDistrictObject] = useState();
	const [allYear, setAllYear] = useState(2022 );
	const [districtYear, setDistrictYear] = useState(2022 );
	const years = [
		{ _id: "2022", name: 2022 },
		{ _id: "2021", name: 2021 },
		{ _id: "2020", name: 2020 },
		{ _id: "2019", name: 2019 },
		{ _id: "2018", name: 2018 },
		{ _id: "2017", name: 2017 },
		{ _id: "2016", name: 2016 },
		{ _id: "2015", name: 2015 },
		{ _id: "2014", name: 2014 },
		{ _id: "2013", name: 2013 },
		{ _id: "2012", name: 2012 }
	];

	const [districtData, setDistrictData] = useState([]);
	const [districtState, setDistrictState] = useState({

		labels: ["Types of Crops"],
		datasets: [{
			label: "Crop amounts around the country",
			backgroundColor: "rgba(54,255,0,0.71)",
			borderColor: "rgb(22,96,0)",
			borderWidth: 2,
			data: [0, 0, 0]

		}]
	});

	const [cropState, setCropState] = useState({

		labels: ["Types of Crops"],
		datasets: [{
			label: "Crop amounts around the country",
			backgroundColor: "rgba(54,255,0,0.4)",
			borderColor: "rgb(22,96,0)",
			borderWidth: 2,
			data: [0, 0, 0]

		}]
	});

	const [clickedDistrict, setClickedDistrict] = useState("District name");
	const [state, setState] = useState({

		labels: ["Types of Crops"],
		datasets: [{
			label: "Crop amounts around the country",
			backgroundColor: "rgba(54,255,0,0.4)",
			borderColor: "rgb(22,96,0)",
			borderWidth: 2,
			data: [0, 0, 0]

		}]
	});
	const [crop, setCrop] = React.useState("");

	const handleChange = async () => {

		const labels = [];
		const data = [];

		for (let i = 0; i < cropData.length; i++) {
			if (crop === cropData[i].crop_Type) {
				labels.push(cropData[i].crop_Year);
				data.push(cropData[i].crop_Amount);
			}
		}

		setCropState({
			labels: labels,
			datasets: [{
				fill: true,
				label: "Crop amounts around the country",
				backgroundColor: "rgba(53,255,2,0.49)",
				borderColor: "rgb(46,143,14)",
				borderWidth: 2,
				data: data

			}]
		});
	};

	function changeDistrictObject(distObj){
		setDistrictObject(distObj);
	}

	async function showDistrictData(districtObj) {
		const dist = await getDistrictById(districtObj.id);
		setClickedDistrict(dist.data.name);

		const labels = [];
		const data = [];

		for (let i = 0; i < districtData.length; i++) {
			if ((dist.data._id === districtData[i].district ) && (districtData[i].year === districtYear)) {
				const cropdetails = await getCropById(districtData[i].crop_Type);
				labels.push(cropdetails.data.name);
				data.push(districtData[i].crop_Amount);
			}
		}


		setDistrictState({
			labels: labels,
			datasets: [{
				label: "Crop amounts in the district",
				backgroundColor: "rgba(54,255,0,0.4)",
				borderColor: "rgb(34,141,0)",
				borderWidth: 2,
				data: data

			}]
		});

		setPieState({
			labels: labels,
			datasets: [{
				label: "Crop amounts in the district",
				backgroundColor: [
					"rgba(127,255,0,0.4)",
					"rgba(255,51,51,0.4)",
					"rgba(104,3,255,0.4)",
					"rgba(17,17,0,0.4)",
					"rgba(178,90,0,0.4)",
					"rgba(0,160,185,0.4)"
				],
				borderColor: [
					"rgba(127,255,0)",
					"rgba(255,51,51)",
					"rgba(104,3,255)",
					"rgb(17,77,0)",
					"rgba(178,90,0)",
					"rgba(0,160,185)"
				],
				borderWidth: 2,
				data: data

			}]
		});
	}

	// function showDistrictData(id){
	// 	setDistrictData(id);
	// }


	useEffect(  () => {
		async function overallCropData() {
			const agridata = await getCropDetails();

			const data_list = agridata.data.map((agri_data) => ({
				crop_Year: agri_data._id.year,
				crop_Type: agri_data._id.cropType,
				crop_Amount: agri_data.totalAmount
			}));
			setCropData(data_list);
			const labels = [];
			const data = [];

			for (let i = 0; i < data_list.length; i++) {
				if (data_list[i].crop_Year==allYear){
					const crop = await getCropById(data_list[i].crop_Type);
					labels.push(crop.data.name);
					data.push(data_list[i].crop_Amount);
				}
			}

			setState({
				labels: labels,
				datasets: [{
					label: "Crop amounts around the country",
					backgroundColor: [
						"rgba(127,255,0,0.4)",
						"rgba(53,255,0,0.4)",
						"rgba(0,217,63,0.4)",
						"rgba(174,255,3,0.4)",
						"rgba(31,126,6,0.4)",
						"rgba(119,122,3,0.4)",
					],
					borderColor: [
						"rgba(127,255,0)",
						"rgba(53,255,0)",
						"rgba(0,217,63)",
						"rgba(174,255,3)",
						"rgba(31,126,6)",
						"rgba(119,122,3)",
					],
					borderWidth: 2,
					data: data

				}]
			});
		}
		async function getAllDistrictData() {
			const district_data = await getDistrictDetails();

			const data_list = district_data.data.map((dist_data) => ({
				year: dist_data._id.year,
				district: dist_data._id.district,
				crop_Type: dist_data._id.cropType,
				crop_Amount: dist_data.totalAmount
			}));

			setDistrictData(data_list);
		}
		async function getCrops() {
			const crop_names = await getCropTypes();
			setCropTypes(crop_names.data);
		}
		getCrops();
		overallCropData();
		getAllDistrictData();
		showDistrictData(districtObject);

	}, [allYear, districtYear]);

	useEffect(()=>{
		handleChange();
	},[crop]);

	// const [districtData, setDistrictData] = useState();

	//data access from axios

	return(
		<div>
			<Grid container spacing={5} justifyContent="center" sx={{marginTop:5}}>
				<Grid item xs={10} md={5.5} textAlign={"center"}>
					<Paper sx={{boxShadow: 5, padding:"25px"}}>
						<div style={{overflowX:"scroll"}}>
							<div style={{minWidth:"500px"}}>
								<div style={{display:"flex", justifyContent:"space-evenly"}}>
									<div><h2 style={{fontSize:"20px",fontFamily: "Montserrat", marginTop:"0px",marginBottom:"20px" }}>Overall Crop data in the country</h2></div>
									<div style={{minWidth:"150px",marginTop:"5px"}}>
										<SelectInput 
										name="allYear" 
										label="Year" 
										value={allYear} 
										onChange={(e)=>{
										setAllYear(e.target.value);
									}} 
									options={years}
									 multi={false}/>
									 </div>
								</div>
								<Bargraph handleData={state} />
							</div>
						</div>
					</Paper>
				</Grid>
				<Grid item xs={10} md={5.5} textAlign={"center"}>
					<Paper sx={{boxShadow: 5, padding:"25px"}}>
						<div style={{overflowX:"scroll"}}>
							<div style={{minWidth:"500px"}}>
								<div style={{display:"flex", justifyContent:"space-evenly"}}>
									<div><h2 style={{fontSize:"20px",fontFamily: "Montserrat", marginTop:"10px",marginBottom:"20px" }}>Crop sale data</h2></div>
									<div style={{minWidth:"150px",marginTop:"5px"}}><SelectInput name="crop" label="crop" value={crop} onChange={(e)=>{
										setCrop(e.target.value);
									}} options={cropTypes} multi={false}/></div>
								</div>
								<Linegraph handleData={cropState} />
							</div>
						</div>
					</Paper>
				</Grid>
			</Grid>
			<div>
				{/* <Grid container spacing={5} justifyContent="center" sx={{marginTop:5, boxShadow:10, padding:5, backgroundColor:"rgb(245,245,245)"}}>
					<Grid item xs={12} textAlign={"center"} align={"center"} marginTop={0}>
						<div><h1 style={{fontSize:30,fontFamily: "Montserrat", marginTop:"0px",marginBottom:"10px" }}>District Data</h1>
							<div style={{display:"flex",flexDirection:"column", alignItems:"center"}}>
								<div><span style={{fontSize:25,fontFamily: "Montserrat", marginTop:"0px",marginBottom:"0px", color:"white", backgroundColor:"rgb(13,171,13)", padding:6, borderRadius:6 }}>{clickedDistrict}</span></div>
								<div style={{minWidth:"120px", marginTop:"16px"}}><SelectInput name="districtYear" label="Year" value={districtYear} onChange={(e)=>{
									setDistrictYear(Number(e.target.value));
								}} options={years} multi={false}/></div>
							</div>
							<p style={{marginTop:10,marginBottom:"-20px" }}>Select a district from map to view district data</p>
						</div>
					</Grid>
					<Grid item xs={10} md={3.8} textAlign={"center"}>
						<Paper className="map-background" sx={{boxShadow: 5}}>
							<Map handleDistrictClick={showDistrictData} handleDistrictObject={changeDistrictObject}/>
						</Paper>
					</Grid>
					<Grid item xs={10} md={6.65} textAlign={"center"}>
						<Paper sx={{boxShadow: 5, padding:"25px"}}>
							<div style={{overflowX:"scroll"}}>
								<div style={{minWidth:"500px"}}>
									<h2 style={{fontSize:"20px",fontFamily: "Montserrat", marginTop:"0px",marginBottom:"0px" }}>Crop types and amount details in District</h2>
									<Bargraph handleData={districtState} />
								</div>
							</div>
						</Paper>
					</Grid>
					<Grid item xs={10} md={6.65} textAlign={"center"}>
						<Paper sx={{boxShadow: 5, padding:"25px"}}>
							<div style={{overflowX:"scroll"}}>
								<div style={{minWidth:"500px"}}>
									<h2 style={{fontSize:"20px",fontFamily: "Montserrat", marginTop:"0px",marginBottom:"0px" }}>Crop types and Amounts</h2>
									<Linegraph handleData={districtState} />
								</div>
							</div>
						</Paper>
					</Grid>
					<Grid item xs={10} md={3.8} textAlign={"center"}>
						<Paper sx={{boxShadow: 5, padding:"25px"}}>
							<h2 style={{fontSize:"20px",fontFamily: "Montserrat", marginTop:"0px",marginBottom:"5px" }}>Crop type comparison</h2>
							<Donutgraph handleData={pieState} />
						</Paper>
					</Grid>
				</Grid> */}
			</div>
		</div>
	);
}


export default Visualization;
