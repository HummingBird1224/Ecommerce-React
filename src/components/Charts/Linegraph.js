import {Line} from "react-chartjs-2";
import React, {useCallback, useRef} from "react";
import PropTypes from "prop-types";
import {Button} from "@mui/material";

// eslint-disable-next-line react/prop-types
function Linegraph(props)  {
	const ref = useRef(null);

	const downloadImage = useCallback(() =>{
		const link = document.createElement("a");
		link.download = "linechart.png";
		link.href = ref.current.toBase64Image();
		link.click();
	},[]);

	return (
		<div className="col-md-5" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
			<Button className="downloadbtn" type="button" onClick={downloadImage} sx={{backgroundColor:"rgb(175,175,175)", color:"white",width:"80px", fontSize:"10px", padding:"5px", marginTop:"5px"}}>Download</Button>
			<Line ref={ref} data={props.handleData}
			/>
		</div>

	);
}
Linegraph.propTypes = {
	handleData : PropTypes.object.isRequired
};

export default Linegraph;
