import React, { useEffect, useState } from "react";
import { FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { getAllStates } from "../../services/stateServices";
import GoogleMap from "../../components/GoogleMap/GoogleMap";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";

function LocationForm(props) {
	const [statesArray, setStatesArray] = useState([]);
	const [districtArray, setDistrictArray] = useState([]);

	const [isMapReset, setMapReset] = useState(false);
	const [isHover, setIsHover] = useState(false);

	useEffect(() => {
		async function fetchData() {
			const { data } = await getAllStates();
			setStatesArray(data.statesList);
		}
		fetchData();
	}, []);

	useEffect(() => {
		const currentState = statesArray.filter((ele) => {
			return ele._id === props.state._id;
		});
		try {
			setDistrictArray(currentState[0].districts);
			props.setDistrict("");
		} catch (e) {
			props.setDistrict("");
		}
	}, [props.state, statesArray]);

	const handleChangeState = (event) => {
		props.setState(event.target.value);
	};
	const handleChangeDistrict = (event) => {
		props.setDistrict(event.target.value);
	};
	const handleMapReset = () => {
		props.setLocation({ lat: "x", lng: "x" });
		setMapReset(!isMapReset);
	};

	return (
		<Grid item container>
			<Grid container>
				<Grid item xs={12} container justifyContent={"center"}>
					<Grid item xs={12} container justifyContent={"center"} m={3}>
						<Grid item xs={12}>
							<Typography variant={"h5"} align={"left"}>
								Location Details
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<hr
								style={{
									color: "black",
									backgroundColor: "black",
									height: 0.1
								}}
							/>
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12} container justifyContent={"center"} ml={3} mr={3}>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<InputLabel
								error={props.state === ""}
								required={true}
								id="demo-simple-select-label">
								State
							</InputLabel>
							<Select
								error={props.state === ""}
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={props.state}
								label="State"
								onChange={handleChangeState}
								MenuProps={{ PaperProps: { sx: { maxHeight: 150 } } }}
							>
								{statesArray != []
									? statesArray.map((element) => {
										return (
											<MenuItem
												key={element._id}
												value={element}
											>
												{element.name}
											</MenuItem>
										);
									})
									: ""
								}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
				<Grid item xs={12} container justifyContent={"center"} mt={3} ml={3} mr={3}>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<InputLabel
								error={props.district === "" && props.state != ""}
								required={true}
								id="demo-simple-select-label"
							>
								District
							</InputLabel>
							<Select
								error={props.district === "" && props.state != ""}
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={props.district}
								label="District"
								onChange={handleChangeDistrict}
								MenuProps={{ PaperProps: { sx: { maxHeight: 150 } } }}
								disabled={districtArray.length == 0 ? true : false}
							>
								{districtArray.length != 0
									? districtArray.map((element) => {
										return (
											<MenuItem
												key={element._id}
												value={element.name}
											>
												{element.name}
											</MenuItem>
										);
									})
									: ("")
								}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
				<Grid item xs={12} container justifyContent={"center"} mt={3} ml={2} mr={3} spacing={1}>
					<Grid item xs={6}>
						<FormControl fullWidth>
							<TextField
								id="location-lat"
								label="Latitude"
								variant="outlined"
								disabled
								value={props.location.lat == "x" ? "" : props.location.lat}
							/>
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<FormControl fullWidth>
							<TextField
								id="location-lng"
								label="Longitude"
								variant="outlined"
								disabled
								value={props.location.lng == "x" ? "" : props.location.lng}
							/>
						</FormControl>
					</Grid>
				</Grid>
				{props.location.lat == "x"
					? (<Grid item xs={12} mt={3} ml={3} mr={3}>
						<Stack direction="row" alignItems="center" gap={1}>
							<InfoIcon color={"info"} />
							<Typography
								textAlign={"center"}
								variant={"body1"}
							>
								Click on the map to get Location
							</Typography>
						</Stack>
					</Grid>)
					: (<Grid item xs={6} mt={3} ml={3} mr={3}>
						<Button
							variant={"contained"}
							color={"warning"}
							onClick={handleMapReset}
						>
							Reset
						</Button>
					</Grid>)
				}

				<Grid item xs={12} container justifyContent={"center"} mt={3} ml={3} mr={3}>
					<Grid
						item xs={12}
						border={1}
						mb={3}
						borderRadius={"4px"}
						bgcolor={"lightgray"}
						borderColor={isHover ? "black" : "#bdbdbd"}
						onMouseEnter={() => {
							setIsHover(true);
						}}
						onMouseLeave={() => {
							setIsHover(false);
						}}
					>
						<GoogleMap
							locationPointer={props.location}
							setPointer={props.setLocation}
							mapReset={isMapReset}
						/>
					</Grid>
				</Grid>

			</Grid>
		</Grid>
	);
}

LocationForm.propTypes = {
	onSubmit: PropTypes.bool,
	getValues: PropTypes.func,

	setState: PropTypes.func.isRequired,
	setDistrict: PropTypes.func.isRequired,
	setLocation: PropTypes.func.isRequired,

	state: PropTypes.any.isRequired,
	district: PropTypes.string.isRequired,
	location: PropTypes.object.isRequired

};

export default LocationForm;
