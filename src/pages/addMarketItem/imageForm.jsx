import React, {useEffect, useState} from "react";
import { Grid, Typography} from "@mui/material";
import "react-image-crop/dist/ReactCrop.css";
import PropTypes from "prop-types";
import ImageUploader from "../../components/imageUploader/ImageUploader";
import { v4 as uuidv4 } from "uuid";

function ImageForm(props){
	const [isHover, setIsHover] = useState(false);
	const [isClick, setIsClick] = useState(false);

	const [imageURL, setImageURL] = useState("");

	useEffect(()=>{
		const imageData = {
			src: imageURL
		};
		props.setImages([imageData]);
	}, [imageURL]);

	return(
		<Grid container>
			<Grid item container xs={12} mb={3}>
				<Grid item container xs={12}>
					<Grid item xs={12} container justifyContent={"center"} m={3}>
						<Grid item xs={12}>
							<Typography variant={"h5"} align={"left"}>
								Images
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<hr
								style={{
									color: "black",
									backgroundColor: "black",
									height: 0.1
								}}
							/>
						</Grid>
						<Grid item xs={12} mt={3}  >
							<Grid
								container
								justifyContent={"center"}
								bgcolor={"lightgray"}
								border={isClick?2:1}
								borderRadius={"4px"}
								borderColor={props.images<=0?"#d32f2f":(isHover?(isClick?"#3fb559":"black"):"gray")}
								onMouseEnter={()=>{
									setIsHover(true);
								}}
								onMouseLeave={()=>{
									setIsHover(false);
									setIsClick(false);
								}}
								onClick={()=>{
									setIsClick(true);
								}}
							>
								<Grid item width={"100%"}>
									<ImageUploader
										height={400}
										fileName={uuidv4()}
										imageURL={imageURL}
										setImageURL={setImageURL}
										folderName={"itemListings"}
										isAddItem={true}
									/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>

				</Grid>
			</Grid>
		</Grid>
	);
}

ImageForm.propTypes = {
	onSubmit: PropTypes.bool,
	getValues: PropTypes.func,

	images: PropTypes.array.isRequired,
	setImages: PropTypes.func.isRequired
};

export default ImageForm;

