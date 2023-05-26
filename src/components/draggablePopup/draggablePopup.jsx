import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import PropTypes from "prop-types";

function PaperComponent(props) {
	return (
		<Draggable
			handle="#draggable-dialog-title"
			cancel={"[class*=\"MuiDialogContent-root\"]"}
		>
			<Paper {...props} />
		</Draggable>
	);
}

export default function DraggableDialog(props) {
	return (
		<div>
			<Dialog
				open={props.open}
				onClose={props.handleClose}
				PaperComponent={PaperComponent}
				aria-labelledby="draggable-dialog-title"
			>
				<DialogTitle style={{ cursor: "move", textAlign:"center" }} id="draggable-dialog-title">
					{props.dialogTitle}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						{props.dialogBody}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					{props.dialogActions}
				</DialogActions>
			</Dialog>
		</div>
	);
}

DraggableDialog.propTypes = {
	dialogBody: PropTypes.element,
	dialogTitle: PropTypes.string,
	dialogActions: PropTypes.element,
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired
};
