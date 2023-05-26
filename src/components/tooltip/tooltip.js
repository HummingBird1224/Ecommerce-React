import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Back from "./tool.mp4";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const style = {
	position: "absolute",
	top: "5%",
	left: "11%",
	right: "11%",
	// transform: "translate(-50%, -50%)",
	maxWidth: 1200,
	minWidth: 200
};

export default function Tooltip() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<div>
			<Button onClick={handleOpen} sx={{boxShadow:5}}><HelpOutlineIcon/></Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<video  id="videoBG" muted={true} loop={true} autoPlay={true}>
						<source src= { Back } type="video/mp4" />
					</video>
				</Box>
			</Modal>
		</div>
	);
}
