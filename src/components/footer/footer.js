import React from "react";
import logo from "../../assets/images/logo.png";
import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

function Footer(){

	return(
		<Grid container>
			<Paper sx={{ width:"100%", bottom: 0,  backgroundImage: `url(${"https://thumbs.dreamstime.com/b/naive-sketch-simple-green-leaves-seamless-pattern-laconic-floral-repeat-motif-background-wrapping-paper-fabric-surface-design-123445896.jpg"})`}}>
				<Grid container justifyContent="center" alignItems="center">
					<Grid item xs={6} sm={4}>
						<img src={logo} alt={"AggriventureExpress"} width={150}/>
					</Grid>
					<Grid item xs={6} sm={6} >
						<Typography>© FRUTRI RETAIL PVT LTD 2023.</Typography>
						<Typography> All rights reserved.</Typography>
					</Grid>
				</Grid>
			</Paper>
		</Grid>

	);

}

export default Footer;