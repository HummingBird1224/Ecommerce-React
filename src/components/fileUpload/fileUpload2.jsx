import React from "react";
import ImageUploading from "react-images-uploading";
// eslint-disable-next-line no-unused-vars
import {Card, Dialog, DialogActions, Grid} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import PropTypes from "prop-types";


function FileUpload2(props) {


	const maxNumber = 4;

	const onChange = (imageList, addUpdateIndex) => {
		// data for submit
		console.log(imageList, addUpdateIndex);
		props.setImages(imageList);
	};

	return (
		<Grid>
			<ImageUploading
				multiple
				value={props.images}
				onChange={onChange}
				maxNumber={maxNumber}
				dataURLKey="data_url"
			>
				{({
					imageList,
					onImageUpload,
					onImageRemoveAll,
					onImageUpdate,
					onImageRemove,
					isDragging,
					dragProps,
				}) => (
					// write your building UI
					<Grid container minHeight={500} p={2}>
						<Grid item container justifyContent={"center"} wrap={"nowrap"}>
							<Grid item >
								<Tooltip title="Upload">
									<Button variant="contained" component="label" color={isDragging ? { color: "red" } : "primary"}
										onClick={onImageUpload}
										{...dragProps}>
										Upload<EditIcon color={"warning"}/>
									</Button>
								</Tooltip>
							</Grid>
							<Grid item >
								<Tooltip title="Remove All">
									<IconButton onClick={onImageRemoveAll}>
										<DeleteSweepIcon color={"error"}/>
									</IconButton>
								</Tooltip>
							</Grid>
						</Grid>
						<Grid item container spacing={1} mt={2}>
							{imageList.map((image, index) => {
								return(

									<Grid item container key={index} xs={12} sm={4} md={6}>
										<Card sx={{maxWidth: 345}}>
											<CardActions>
												<Grid container wrap={"nowrap"} justifyContent={"center"}>
													<Grid item>
														<Tooltip title="Edit">
															<IconButton onClick={() => onImageUpdate(index)}>
																<EditIcon color={"warning"}/>
															</IconButton>
														</Tooltip>
													</Grid>
													<Grid item>
														<Tooltip title="Remove">
															<IconButton onClick={() => onImageRemove(index)}>
																<CancelIcon color={"error"}/>
															</IconButton>
														</Tooltip>
													</Grid>
												</Grid>
											</CardActions>

											<CardMedia
												component="img"
												height="140"
												image={image["data_url"]}
												alt="green iguana"
											/>
										</Card>
									</Grid>

								);
							})}
						</Grid>

					</Grid>
				)}
			</ImageUploading>
		</Grid>
	);
}

FileUpload2.propTypes = {
	images: PropTypes.array.isRequired,
	setImages: PropTypes.func.isRequired
};

export default FileUpload2;
