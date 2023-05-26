import React from "react";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextInput from "../../../components/textInput/textInput";

function LoginDetails(props) {

	return (
		<Grid container spacing={2} alignItems="flex-start">
			<Grid item xs={12}>
				<Typography variant="h5">Login Details</Typography>
				<hr />
			</Grid>

			<Grid item xs={12} md={6}>
				{/* eslint-disable-next-line react/prop-types */}
				<TextInput
					name="username"
					label="User Name"
					value={props.username}
					onChange={props.handleChange}
					required={true} />
			</Grid>

			<Grid item xs={12} md={6}>
				{/* eslint-disable-next-line react/prop-types */}
				<TextInput name="password"
					label="Password"
					value={props.password}
					onChange={props.handleChange}
					required={true} type="password"
				/>
			</Grid>

			<Grid item xs={12} md={6}>
				{/* eslint-disable-next-line react/prop-types */}
				<TextInput
					name="conPassword"
					label="Confirm Password"
					value={props.conPassword}
					onChange={props.handleChange}
					required={true}
					type="password"
				/>
			</Grid>

		</Grid>


	);
}

export default LoginDetails;