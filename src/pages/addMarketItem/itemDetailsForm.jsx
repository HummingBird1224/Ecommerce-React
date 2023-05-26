import React, {useEffect, useState} from "react";
import {
	FormControl,
	Grid,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography
} from "@mui/material";
import {getCropTypes} from "../../services/croptypeServices";
import PropTypes from "prop-types";
import WarningIcon from "@mui/icons-material/Warning";

function ItemDetailsForm(props){
	const [cropTypes, setCropTypes] = useState([]);

	useEffect( () => {
		async function fetchData() {
			const {data} = await getCropTypes();
			setCropTypes(data);
		}
		fetchData();
	},[]);

	const handleChange = (event) => {
		props.setCropType(event.target.value);
	};

	const handleTitle = (event) => {
		const string = event.target.value;
		if(string.length <=15){
			props.setTitle(event.target.value);
		}
	};

	const handledescription = (event) => {
		const string = event.target.value;
		if(string.length <=10000){
			props.setDescription(event.target.value);
		}
	};

	const handleQuantity = (event) => {
		if(event.target.value==""){
			props.setQuantity(event.target.value);
		}else if(event.target.value>=0 && event.target.value<=100000000) {
			const value = Math.ceil(event.target.value);
			props.setQuantity(value);
		}
	};
	const handleExpectedPrice = (event) => {
		if(event.target.value==""){
			props.setExpectedPrice(event.target.value);
		}else if(event.target.value>=0 && event.target.value<=100000000) {
			const value = Math.ceil(event.target.value);
			props.setExpectedPrice(value);
		}
	};

	return(
		<Grid item container>
			<Grid container>
				<Grid item xs={12} container justifyContent={"center"}>
					<Grid item xs={12} container justifyContent={"center"} m={3}>
						<Grid item xs={12}>
							<Typography variant={"h5"} align={"left"}>
								Item Details
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
							<TextField
								required={true}
								id="listing-title"
								label="Listing Title"
								variant="outlined"
								onChange={handleTitle}
								value={props.title}
								error={props.title === ""}
							/>
						</FormControl>
					</Grid>
				</Grid>

				<Grid item xs={12} container justifyContent={"center"} mt={3} ml={3} mr={3}>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<InputLabel required={true} error={props.cropType === ""} id="demo-simple-select-label">Crop Type</InputLabel>
							<Select
								error={props.cropType === ""}
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={props.cropType}
								label="Crop Type"
								onChange={handleChange}
								MenuProps={{ PaperProps: { sx: { maxHeight: 150 } } }}
							>
								{cropTypes!=[]?cropTypes.map((element)=>{
									return(
										<MenuItem key={element._id} value={element.name}>{element.name}</MenuItem>
									);
								}):""}
							</Select>
						</FormControl>
					</Grid>
				</Grid>

				<Grid item xs={12} container justifyContent={"center"} mt={3} ml={3} mr={3}>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<TextField
								error={props.quantity === "" || props.quantity<5000}
								required={true}
								id="quantity"
								label="Quantity"
								variant="outlined"
								type={"number"}
								onChange={handleQuantity}
								value={props.quantity}
								InputProps={{
									endAdornment: <InputAdornment position="start">kg</InputAdornment>,
								}}
							/>
						</FormControl>
					</Grid>
				</Grid>
				{
					(props.quantity==""||props.quantity<5000)?
						(<Grid item xs={12} mr={3} mt={3} ml={3}>
							<Stack direction="row" alignItems="center" gap={1}>
								<WarningIcon color={"warning"}/>
								<Typography textAlign={"left"} variant={"body1"}>
									Enter Minimum Quantity Of 5000 kg
									</Typography>
							</Stack>
						</Grid>):
						("")
				}
				<Grid item xs={12} container justifyContent={"center"} mt={3} ml={3} mr={3}>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<TextField
								error={props.expectedPrice === "" || props.expectedPrice<5000}
								required={true}
								id="expectedPrice"
								label="Expected Price"
								variant="outlined"
								type={"number"}
								onChange={handleExpectedPrice}
								value={props.expectedPrice}
								InputProps={{
									endAdornment: <InputAdornment  position="start">₹</InputAdornment>,
								}}
							/>
						</FormControl>
					</Grid>
				</Grid>
				{
					(props.expectedPrice==""||props.expectedPrice<5000)?
						(<Grid item xs={12} mr={3} mt={3} ml={3}>
							<Stack direction="row" alignItems="center" gap={1}>
								<WarningIcon color={"warning"}/>
								<Typography textAlign={"left"} variant={"body1"}>
									Enter Minimum Price Of 5000 ₹
									</Typography>
							</Stack>
						</Grid>):
						("")
				}

				<Grid item xs={12} container justifyContent={"center"} m={3} >
					<Grid item xs={12}>
						<FormControl fullWidth>
							<TextField
								id="description"
								label="Description"
								variant="outlined"
								multiline
								maxRows={6}
								value={props.description}
								onChange={handledescription}
							/>
						</FormControl>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

ItemDetailsForm.propTypes={
	onSubmit: PropTypes.bool,
	getValues: PropTypes.func,

	title:PropTypes.string.isRequired,
	cropType:PropTypes.string.isRequired,
	quantity:PropTypes.any.isRequired,
	description:PropTypes.string.isRequired,

	setTitle:PropTypes.func.isRequired,
	setCropType:PropTypes.func.isRequired,
	setQuantity:PropTypes.func.isRequired,
	setDescription:PropTypes.func.isRequired
};

export default ItemDetailsForm;
