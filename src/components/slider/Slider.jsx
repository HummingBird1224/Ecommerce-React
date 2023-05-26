import React, {useState} from "react";
import {Grid, Slider, Typography} from "@mui/material";
import PropTypes from "prop-types";

function CustomeSlider(props){
	const {handleSliderChange, valueText, value, heading} = props;
	const [sliderValues, setValues] = useState(value);


	function handleChange(event, newValue){
		setValues(newValue);
		handleSliderChange(event, newValue);
	}

	return(
		<Grid item spacing={1} container height={100} xs={12} justifyContent={"center"}>
			<Grid item xs={12}>
				<Typography variant={"h6"} align={"center"} >
					{heading}
				</Typography>
			</Grid>
			<Grid item xs={3}>
				<Typography variant={"h6"} color={"primary"} align={"right"} mr={1}>
					{Intl.NumberFormat("en", { notation: "compact" }).format(value[0])}
				</Typography>
			</Grid>
			<Grid item xs={6}>
				<Slider
					min={0}
					max={1000000}
					step={100000}
					getAriaLabel={() => "Temperature range"}
					value={sliderValues}
					onChange={handleChange}
					valueLabelDisplay="auto"
					getAriaValueText={valueText}
				/>
			</Grid>
			<Grid item xs={3}>
				<Typography variant={"h6"} color={"primary"} ml={1}>
					{Intl.NumberFormat("en", { notation: "compact" }).format(value[1])}
				</Typography>
			</Grid>
		</Grid>
	);
}
CustomeSlider.propTypes = {
	value: PropTypes.array.isRequired,
	valueText: PropTypes.func.isRequired,
	handleSliderChange: PropTypes.func.isRequired,
	heading: PropTypes.string
};

export default CustomeSlider;
