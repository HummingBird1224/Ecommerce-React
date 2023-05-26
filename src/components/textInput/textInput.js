import React from "react";
import {FormControl, TextField} from "@mui/material";

/*
Text input field.
<TextInput name="firstName" label="First Name" value={} onChange={} required={true}/>
 */

function TextInput(props){

	return(
		<FormControl fullWidth>
			{/* eslint-disable-next-line react/prop-types */}
			<TextField id={props.name} type={props.type} name={props.name} label={props.label} required={props.required} value={props.value === undefined? "" : props.value} onChange={props.onChange} variant="outlined" error={props.error} ref={props.ref} color={props.color} helperText={props.helperText}/>
		</FormControl>

	);

}

export default TextInput;
