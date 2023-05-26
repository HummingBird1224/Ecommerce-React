import React from "react";
import Grid from "@mui/material/Grid";
import "./video.css";
import Back from "./optimized.mp4";

function Video(){

	// states

	//data access from axios

	//function
	// eslint-disable-next-line no-mixed-spaces-and-tabs

	return(

		<div className="carousel">
			<Grid container>
				<Grid item xs={12} sx={{marginTop:"2.4px"}}>
					<video  id="videoBG" muted={true} loop={true} autoPlay={true}>
						<source src= { Back } type="video/mp4" />
					</video>
				</Grid>
			</Grid>
		</div>
	);
}

export default Video;
