import React, {useEffect, useState} from "react";
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";
import PropTypes from "prop-types";
import authService from "../../services/auth.service";
import {CircularProgress, Grid} from "@mui/material";
import Container from "@mui/material/Container";

function MyComponent(props) {
	const [apiKey, setApikey] = useState(null);
	const [location, setLocation] = useState({lat: "x", lng: "x"});
	useEffect(()=>{
		const fetchData = async ()=>{
			const {data} = await authService.getGoogleAPIkey();
			setApikey(data);
		};
		fetchData();
	},[]);

	useEffect(()=>{
		setLocation({lat: "x", lng: "x"});
	},[props.mapReset]);

	const [center, setCenter] = useState({
		lat: 6.9271,
		lng: 79.8612
	});

	const containerStyle = {
		width: "auto",
		height: "500px",
		marginBottom: "20px"
	};

	const handleDrag = (event)=>{
		const {latLng} = event;
		const lat = latLng.lat();
		const lng = latLng.lng();
		props.setPointer({lat: lat, lng: lng});
		setLocation({lat: lat, lng: lng});
	};

	const mapClick = (event)=>{
		const {latLng} = event;
		const lat = latLng.lat();
		const lng = latLng.lng();
		props.setPointer({lat: lat, lng: lng});
		setLocation({lat: lat, lng: lng});
		setCenter({lat: lat, lng: lng});
	};

	function renderMark(){
		if(location.lat==="x" && location.lng==="x"){
			return;
		}
		const icon = {
			url: "https://cdn.pixabay.com/photo/2014/04/02/10/45/poi-304466_960_720.png", // url
			scaledSize: { height: 45, width: 30 }
		};
		return(
			<Marker
				position={location}
				draggable={true}
				onDrag={handleDrag}
				icon={icon}
			/>
		);
	}

	if(apiKey==null || apiKey==""){
		return(
			<Container>
				<Grid container justifyContent={"center"}>
					<Grid item>
						<CircularProgress/>
					</Grid>
				</Grid>
			</Container>
		);
	}
	return (
		<LoadScript
			googleMapsApiKey={apiKey}
		>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={12}
				onClick={mapClick}
				options={{streetViewControl: false}}

			>
				{renderMark()}
			</GoogleMap>
		</LoadScript>
	);
}

MyComponent.propTypes = {
	locationPointer: PropTypes.object,
	setPointer: PropTypes.func,
	mapReset: PropTypes.bool
};

export default MyComponent;
