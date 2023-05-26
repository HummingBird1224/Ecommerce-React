import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import PropTypes from "prop-types";

function CardComponent(props) {
	
	return (
		<Card sx={{ maxWidth: 345 }} onClick={props.onClick}>
			<CardActionArea>

				<CardMedia
					image={props.img}
					component="img"
					height="140"
					alt={props.heading}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{props.heading}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{props.body}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}

CardComponent.propTypes = {
	img: PropTypes.string,
	heading: PropTypes.string,
	body: PropTypes.string,
	onClick: PropTypes.func
};

export default CardComponent;