import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllStates } from "../../services/stateServices";

export default function AddressForm(props) {
	const [stateArray, setStateArray] = useState([]);
	useEffect(() => {
		async function fetchData() {
			const { data } = await getAllStates();
			setStateArray(data.statesList);
		}
		fetchData();
	}, []);
	const handleChangeState = (event) => {
		props.setState(event.target.value);
	};
	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Shipping address
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="firstName"
						name="firstName"
						label="First name"
						fullWidth
						autoComplete="given-name"
						variant="standard"
						value={props.firstname}
						onChange={(event) => {
							const input = event.target.value;
							if (input.length < 25) {
								props.setFirstname(event.target.value);
							}
						}}

					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="lastName"
						name="lastName"
						label="Last name"
						fullWidth
						autoComplete="family-name"
						variant="standard"
						value={props.lastname}
						onChange={(event) => {
							const input = event.target.value;
							if (input.length < 25) {
								props.setLastname(event.target.value);
							}
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						id="address1"
						name="address1"
						label="Address line 1"
						fullWidth
						autoComplete="shipping address-line1"
						variant="standard"
						value={props.addressLn1}
						onChange={(event) => {
							const input = event.target.value;
							if (input.length < 200) {
								props.setAddressLn1(event.target.value);
							}
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="address2"
						name="address2"
						label="Address line 2"
						fullWidth
						autoComplete="shipping address-line2"
						variant="standard"
						value={props.addressLn2}
						onChange={(event) => {
							const input = event.target.value;
							if (input.length < 500) {
								props.setAddressLn2(event.target.value);
							}
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						id="district"
						name="district"
						label="District"
						fullWidth
						autoComplete="shipping address-level2"
						variant="standard"
						value={props.district}
						onChange={(event) => {
							const input = event.target.value;
							if (input.length < 40) {
								props.setdistrict(event.target.value);
							}
						}}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl fullWidth>
						<InputLabel required={true} id="demo-simple-select-label">State</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							variant="standard"
							id="demo-simple-select"
							value={props.state}
							label="State"
							onChange={handleChangeState}
							MenuProps={{ PaperProps: { sx: { maxHeight: 150 } } }}
						>
							{stateArray != [] ? stateArray.map((element) => {
								return (
									<MenuItem key={element.name} value={element}>{element.name}</MenuItem>
								);
							}) : ""}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={6} >
					<TextField
						required
						id="zip"
						name="zip"
						label="Zip / Postal code"
						fullWidth
						autoComplete="shipping postal-code"
						variant="standard"
						value={props.zipCode}
						onChange={(event) => {
							const input = event.target.value;
							if (input.length < 6) {
								props.setZipCode(event.target.value);
							}
						}}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

AddressForm.propTypes = {
	firstname: PropTypes.string.isRequired,
	setFirstname: PropTypes.func.isRequired,
	lastname: PropTypes.string.isRequired,
	setLastname: PropTypes.func.isRequired,
	addressLn1: PropTypes.string.isRequired,
	setAddressLn1: PropTypes.func.isRequired,
	addressLn2: PropTypes.string,
	setAddressLn2: PropTypes.func.isRequired,
	district: PropTypes.string.isRequired,
	setDistrict: PropTypes.func.isRequired,
	state: PropTypes.string.isRequired,
	setState: PropTypes.func.isRequired,
	zipCode: PropTypes.string.isRequired,
	setZipCode: PropTypes.func.isRequired
};
