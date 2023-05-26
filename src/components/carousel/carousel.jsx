import React from "react";
import {Grid, Paper, Skeleton} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import PropTypes from "prop-types";

function Item(props)
{
	return (
		props.imagesrc==null?
			<Paper>
				<Skeleton variant="rectangular" width={"auto"} height={300} animation="wave"/>
			</Paper>:
			<Grid container justifyContent={"center"}>
				<Grid item>
					<img height={300} src={props.imagesrc}/>
				</Grid>

			</Grid>

	);
}

function CustomCarousel(props){
	return(
		<Carousel autoPlay={false} height={300} >
			{
				props.images.map( (key) => <Item key={key._id} imagesrc ={key.src} /> )
			}
		</Carousel>
	);
}

Item.propTypes = {
	imagesrc: PropTypes.string
};

CustomCarousel.propTypes = {
	images: PropTypes.array
};

export default CustomCarousel;
