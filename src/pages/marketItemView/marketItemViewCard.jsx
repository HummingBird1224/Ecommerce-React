import React from "react";
import {Grid} from "@mui/material";
import Carousel from "../../components/carousel/carousel";
import PropTypes from "prop-types";

function ItemViewCard(props){
	const cropData = props.cropData;
	const {images } = cropData;
	return(
		<Grid item container mt={3} direction={"column"}>
			<Grid xs={12} item container justifyContent={"center"} >
				<Grid item maxWidth={600} minWidth={400}>
					<Carousel images={images} />
				</Grid>
			</Grid>
		</Grid>
	);
}

ItemViewCard.propTypes = {
	cropData: PropTypes.object.isRequired
};

export default ItemViewCard;
