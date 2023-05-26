import React from "react";
import {Grid, Typography} from "@mui/material";
import TextInput from "../../components/textInput/textInput";

export default function EditItemDetailsForm(){
	return(
		<Grid item container>
			{/*<Paper elevation={4}>*/}
			<Grid container p={1} >
				<Grid item xs={12} container justifyContent={"center"}>
					<Grid item>
						<Typography variant={"h4"}>
							Edit Item Details
						</Typography>
					</Grid>
				</Grid>
				<Grid item xs={12} container justifyContent={"center"} mt={3} ml={3} mr={3}>
					<Grid item xs={12}>
						<TextInput name="cropType" label="Crop Type" required={true}/>
					</Grid>
				</Grid>
				<Grid item xs={12} container justifyContent={"center"} mt={3} ml={3} mr={3}>
					<Grid item xs={12}>
						<TextInput name="quantity" label="Quantity" type={"number"} required={true}/>
					</Grid>
				</Grid>
				<Grid item xs={12} container justifyContent={"center"} mt={3} ml={3} mr={3}>
					<Grid item xs={12}>
						<TextInput name="location" label="Location" required={true}/>
					</Grid>
				</Grid>
				<Grid item xs={12} container justifyContent={"center"} mt={3} ml={3} mr={3}>
					<Grid item xs={12}>
						<TextInput name="contactNumber" label="Contact Number" required={true}/>
					</Grid>
				</Grid>
				<Grid item xs={12} container justifyContent={"center"} mt={3} ml={3} mr={3}>
					<Grid item xs={6}>

					</Grid>
				</Grid>
				<Grid item xs={12} container justifyContent={"center"} mt={3} ml={3} mr={3}>

				</Grid>
			</Grid>
			{/*</Paper>*/}
		</Grid>
	);
}
