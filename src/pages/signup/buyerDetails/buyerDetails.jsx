import React from "react";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import TextInput from "../../../components/textInput/textInput";

function BuyerDetails(props){

	return(
		<Grid container spacing={2} alignItems="flex-start">
			<Grid item xs={12}>
				<Typography variant="h5">Buyer Details</Typography>
				<hr />
			</Grid>

			<Grid item xs={12} md={6}>
				{/* eslint-disable-next-line react/prop-types */}
				<TextInput name="firstName" label="First Name" value={props.firstName} onChange={props.handleChange} required={true}/>
			</Grid>

			<Grid item xs={12} md={6}>
				{/* eslint-disable-next-line react/prop-types */}
				<TextInput name="lastName" label="Last Name" value={props.lastName} onChange={props.handleChange} required={true}/>
			</Grid>

			<Grid item xs={12} md={6}>
				{/* eslint-disable-next-line react/prop-types */}
				<TextInput name="email" label="Email" value={props.email} onChange={props.handleChange} required={true} type="email"/>
			</Grid>

			<Grid item xs={12} md={6}>
				{/* eslint-disable-next-line react/prop-types */}
				<TextInput name="telephone" label="Telephone Number" value={props.telephone} onChange={props.handleChange} required={true} type="tel"/>
			</Grid>

			<Grid item xs={12} md={6}>
				{/* eslint-disable-next-line react/prop-types */}
				<TextInput name="nic" label="NIC Number" value={props.nic} onChange={props.handleChange} required={true}/>
			</Grid>

			<Grid item xs={12} md={6}>
				{/* eslint-disable-next-line react/prop-types */}
				<TextInput name="address" label="Address" value={props.address} onChange={props.handleChange} required={true} />
			</Grid>

		</Grid>


	);
}

export default BuyerDetails;