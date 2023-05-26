import React, { useState } from "react";
import MultiImageInput from "react-multiple-image-input";
import theme from "../theme/theme";
// eslint-disable-next-line no-unused-vars
import {Grid} from "@mui/material";

function FileUpload() {
	const crop = {
		aspect: 16/ 9,
		width: 200,
		disabled:true,
		circularCrop:true,
		minHeight:50
	};

	// function customElement(){
	// 	return(
	// 		<Grid bgcolor={"red"} height={500}>
	// 			testing
	// 		</Grid>
	// 	);
	// }

	const [images, setImages] = useState({});
	const primary = theme.palette.primary.main;
	console.log(images);
	return (
		<MultiImageInput
			max={6}
			images={images}
			setImages={setImages}
			cropConfig={{ crop}}
			theme={{
				background: "rgb(145,145,145)",
				outlineColor: "#ffffff",
				textColor: primary,
				buttonColor: primary,
				modalColor: "rgba(98,98,98,0.85)",

			}}
		/>
	);
}

export default FileUpload;
