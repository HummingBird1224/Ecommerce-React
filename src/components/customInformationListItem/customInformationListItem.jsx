import React from "react";
import {Grid, Typography} from "@mui/material";
import PropTypes from "prop-types";
import CustomTable from "../customTable/customTable";


function customLinformationListItem(props) {
	return (
		<Grid container item xs={12} mt={props.topMargin} height={props.height}>
			<Grid item xs={3}>
				<Typography gutterBottom variant="p" component="div">
					{props.infoTitle}
				</Typography>
			</Grid>
			<Grid item xs={1}>
				<Typography gutterBottom variant="p" component="div">
					:
				</Typography>
			</Grid>
			<Grid item xs={8}>
				<Typography gutterBottom variant="p" component="div">
					{props.infoValue}
				</Typography>

			</Grid>
		</Grid>
	);
}

CustomTable.propTypes = {
	infoTitle: PropTypes.string,
	infoValue: PropTypes.string,
	topMargin: PropTypes.number,
	height: PropTypes.number
};

export default customLinformationListItem;