import React from "react";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextInput from "../../../components/textInput/textInput";
import SelectInput from "../../../components/selectInput/selectInput";
import PropTypes from "prop-types";
import ListInput from "../../../components/selectInput/cityInput";

function ProducerDetails(props) {

	return (
		<Grid container spacing={2} alignItems="flex-start">
			<Grid item xs={12}>
				<Typography variant="h5">FPO / SHG Details</Typography>
				<hr />
			</Grid>
			<Grid item xs={12} md={6}>
				{/* eslint-disable-next-line react/prop-types */}
				<TextInput name="nic" label="FPO Name" value={props.nic} onChange={props.handleChange} required={true} />
			</Grid>

			<Grid item xs={12} md={6}>
				{/* eslint-disable-next-line react/prop-types */}
				<TextInput name="email" label="Email" value={props.email} onChange={props.handleChange} required={true} type="email" />
			</Grid>

			<Grid item xs={12} md={6}>
				{/* eslint-disable-next-line react/prop-types */}
				<TextInput
					name="firstName"
					label="CEO First Name"
					value={props.firstName}
					onChange={props.handleChange}
					required={true}
				/>
			</Grid>

			<Grid item xs={12} md={6}>
				{/* eslint-disable-next-line react/prop-types */}
				<TextInput name="lastName" label="CEO Last Name" value={props.lastName} onChange={props.handleChange} required={true} />
			</Grid>

			

			<Grid item xs={12} md={6}>
				{/* eslint-disable-next-line react/prop-types */}
				<TextInput name="telephone" label="Mobile Number" value={props.telephone} onChange={props.handleChange} required={true} type="tel" />
			</Grid>

			

			<Grid item xs={12} md={6}>
				{/* eslint-disable-next-line react/prop-types */}
				<TextInput name="address" label="Address" value={props.address} onChange={props.handleChange} required={true} />
			</Grid>

			<Grid item xs={12} md={6}>
				{/* eslint-disable-next-line react/prop-types */}
				<SelectInput
					name="state"
					label="State"
					value={props.state}
					onChange={props.handleChange}
					required={true}
					options={props.states}
					multi={false}
				/>
			</Grid>

			<Grid
				item
				hidden={props.districts.length === 0}
				xs={12} md={6}
			>
				<ListInput
					
					name="district"
					label="District"
					value={props.district}
					onChange={props.handleChange}
					required={true}
					options={props.districts}
					multi={false}
				/>
			</Grid>


			{/* <Grid
				item
				hidden={props.districts.length === 0}
				xs={12} md={6}
			>
				<ListInput
					name="tehsil"
					label="Tehsil"
					value={props.district}
					onChange={props.handleChange}
					required={true}
					options={props.districts}
					multi={false}
				/>
			</Grid> */}


		</Grid>


	);
}

ProducerDetails.propTypes = {
	cities: PropTypes.array,
	handleChange: PropTypes.func,
	city: PropTypes.string
};

export default ProducerDetails;