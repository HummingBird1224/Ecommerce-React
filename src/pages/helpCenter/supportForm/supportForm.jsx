import React from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import Button from "@mui/material/Button";

function SupportForm(props){

	const Names = ["Agricultural Support","Technical Support","Report an Issue","Marketplace Support"];

	return(
		// eslint-disable-next-line react/prop-types
		<Dialog open={props.open} onClose={props.handleClose}>
			{/* eslint-disable-next-line react/prop-types */}
			<DialogTitle>{Names[props.type]}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Describe the issue. our officers will reach you soon
				</DialogContentText>

				{/* eslint-disable-next-line react/prop-types */}
				<TextField onChange={props.onChange} autoFocus margin="dense"
					/* eslint-disable-next-line react/prop-types */
					id="subject"
					label="Subject"
					type="email"
					name="subject"
					fullWidth
					/* eslint-disable-next-line react/prop-types */
					value={props.subject}
					variant="standard"
				/>

				{/* eslint-disable-next-line react/prop-types */}
				<TextField onChange={props.onChange}
					autoFocus
					margin="dense"
					/* eslint-disable-next-line react/prop-types */
					id="body"
					label="Description"
					type="email"
					name="body"
					fullWidth
					/* eslint-disable-next-line react/prop-types */
					value={props.value}
					variant="standard"
					multiline
				/>
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

export default SupportForm;