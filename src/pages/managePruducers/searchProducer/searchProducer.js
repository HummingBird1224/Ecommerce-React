import React from "react";
import { Grid} from "@mui/material";
import TextInput from "../../../components/textInput/textInput";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

function SearchProducer(props){

	return(
		<Grid container xs={12} spacing={1} alignItems="center" align="center">
			<Grid item xs={12} sm={4}>
				{/* eslint-disable-next-line react/prop-types */}
				<TextInput name="id" label="NIC No" value={props.id} onChange={props.onChange}/>
			</Grid>
			<Grid item xs={12} sm={4} >
				{/* eslint-disable-next-line react/prop-types */}
				<TextInput name="name" label="Username" value={props.name} onChange={props.onChange}/>
			</Grid>
			<Grid item xs={6} sm={4}>
				<Button variant="contained" sx={{mr:1}}>Search</Button>
				<Link href={"/addProducer"} underline="none" >
					<Button variant="contained" sx={{mr:1}}>Add New</Button>
				</Link>

			</Grid>
		</Grid>
	);
}

export default SearchProducer;