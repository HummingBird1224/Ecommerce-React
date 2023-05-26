import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

/*
<SelectInput name="userType" label="User Type" value={props.userType} onChange={props.handleChange} options={[{value:0,name:"Producer"}, {value:1,name:"Buyer"}]} multi={false}/>
 */

function SelectInput(props) {


	return (
		<FormControl fullWidth>
			{/* eslint-disable-next-line react/prop-types */}
			<InputLabel
				id={props.name}
			>
				{props.label}
			</InputLabel>
			{/* eslint-disable-next-line react/prop-types */}
			<Select
				multiple={props.multi}
				labelId={props.name}
				id={props.name}
				name={props.name}
				value={props.value !== undefined ? props.value : ""}
				label={props.label}
				required={props.required}
				onChange={props.onChange}
			>
				{/* eslint-disable-next-line react/prop-types */}
				{props.options.map(({ _id, name }) => (
					// eslint-disable-next-line react/jsx-key
					<MenuItem value={_id}>{name}</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

export default SelectInput;