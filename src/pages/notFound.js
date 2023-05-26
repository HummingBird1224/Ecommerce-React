import React from "react";
import {Grid, Typography} from "@mui/material";
import {LinkedButtonRound} from "../components/button/button";

function ErrorPage(){
	return(
		<Grid container justifyContent={"center"} textAlign={"center"} height={1000}>
			<Grid item xs={6}>
				<Typography variant={"h1"} color={"green"}>
					Oops!
				</Typography>
				<Typography variant={"h3"} color={"red"}>
					404: page not found
				</Typography>
				<Typography variant={"h2"} color={"warning"} >
					Umm...Are you Lost?
				</Typography>
				<img height={300} src={"/404.png"}/>
				<Typography variant={"h2"} color={"warning"} >
					I SUGGEST YOU MOVE
				</Typography>
				<LinkedButtonRound href={"/"} content={"GO BACK"}/>
			</Grid>
		</Grid>
	);
}

export default ErrorPage;
