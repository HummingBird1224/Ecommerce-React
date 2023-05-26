import React from "react";
import "./imageResize.css";

function imageResize() {
	return (
		<div className="image-container">
			<h3 className="page-header"></h3>
			<img
				className='display-image'
				src="https://www.pexels.com/photo/red-field-summer-agriculture-70741/"
				alt="medium size flower image"
			/>
		</div>
	);
}

export default imageResize;