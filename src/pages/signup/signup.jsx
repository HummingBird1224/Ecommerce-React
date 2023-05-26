import React from "react";
import Copyright from "../../components/copyright/copyright";
import {Grid} from "@mui/material";
import SignupNavigation from "./signupNavigation/signupNavigation";


function Signup() {

	return (

		<Grid container>
			<Grid item sm={12}><SignupNavigation /></Grid>
			<Grid item sm={12}><Copyright /></Grid>
		</Grid>

	);
}

export default Signup;