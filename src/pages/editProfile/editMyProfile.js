import React from "react";
import {Grid} from "@mui/material";
import EditMyProfileForm from "./editProfileForm/editMyProfileForm";

function EditMyProfile(){
	return(
		<Grid container justifyContent="center" spacing={2} sx={{backgroundImage: `url(${"https://imageio.forbes.com/specials-images/imageserve/5ea0bf898c2caa0006e718e2/0x0.jpg?format=jpg&width=1200"})`, height: "100vh", backgroundRepeat: "round"}}>
			<Grid item xs={12}>
				<EditMyProfileForm />
			</Grid>
		</Grid>
	);
}

export default EditMyProfile;