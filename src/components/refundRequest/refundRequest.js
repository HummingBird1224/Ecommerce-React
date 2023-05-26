import React from "react";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField
} from "@mui/material";
import Button from "@mui/material/Button";

function RefundRequest(props){

	return(
		// eslint-disable-next-line react/prop-types
		<Dialog open={props.open} onClose={props.handleClose}>
			{/* eslint-disable-next-line react/prop-types */}
			<DialogTitle>Refund Request</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Describe the issue you faced clearly.
				</DialogContentText>
				{/* eslint-disable-next-line react/prop-types */}
				<TextField onChange={props.onChange}
					autoFocus margin="dense"
					id="body"
					label="Description"
					type="text"
					name="body"
					/* eslint-disable-next-line react/prop-types */
					fullWidth value={props.body}
					variant="standard"
					multiline/>

				<DialogContentText mt={2}>
					Enter refund value
				</DialogContentText>
				{/* eslint-disable-next-line react/prop-types */}
				<TextField onChange={props.onChange}
					autoFocus margin="dense"
					id="value"
					label="Refund Value (Rs)"
					type="number"
					name="value"
					/* eslint-disable-next-line react/prop-types */
					fullWidth value={props.value}
					variant="standard"/>
			</DialogContent>
			<DialogActions>
				{/* eslint-disable-next-line react/prop-types */}
				<Button onClick={props.handleClose}>Cancel</Button>
				{/* eslint-disable-next-line react/prop-types */}
				<Button onClick={props.handleSubmit}>Submit</Button>
			</DialogActions>
		</Dialog>
	);
}

export default RefundRequest;