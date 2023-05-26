import * as React from "react";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

export default function SaveButton(props) {
	return (
		<Button
			onClick={props.onClick}
			variant={props.variant}
			color={"warning"}
			sx={props.sx}
		>Save{" "}<SaveOutlinedIcon/></Button>
	);
}

export function LinkedButton(props){
	return(
		<Link to={props.href} style={{ textDecoration: "none" }}>
			<Button variant={props.variant?props.variant:"outlined"} sx={props.sx} color={props.color}>
				{props.content}
			</Button>
		</Link>
	);
}

export function LinkedButtonRound(props){
	return(
		<Link to={props.href} style={{textDecoration:"none"}}>
			<Button
				variant={"contained"}
				size={"large"}
				sx={
					{
						color:"white",
						fontWeight:"bold",
						borderRadius: "100px"
					}
				}
				color={props.color?props.color:"primary"}>
				{props.content}
			</Button>
		</Link>
	);
}

LinkedButton.propTypes = {
	/** The href is the path that the button directs to*/
	href: PropTypes.string,
	/** The content is the Button Name */
	content: PropTypes.string,
	color: PropTypes.string,
	variant: PropTypes.string,
	sx: PropTypes.object
};
LinkedButtonRound.propTypes = {
	/** The href is the path that the button directs to*/
	href: PropTypes.string.isRequired,
	/** The content is the Button Name */
	content: PropTypes.string,
	color: PropTypes.string
};
SaveButton.propTypes = {
	onClick: PropTypes.func,
	variant: PropTypes.string,
	sx: PropTypes.object
};
