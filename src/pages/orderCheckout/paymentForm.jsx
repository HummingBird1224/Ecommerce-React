import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

export default function PaymentForm(props) {
	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Payment method
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<TextField
						required
						id="cardName"
						label="Name on card"
						fullWidth
						autoComplete="cc-name"
						variant="standard"
						value={props.nameOnCard}
						onChange={(event)=>{
							const input = event.target.value;
							if(input.length<25){
								props.setNameOnCard(event.target.value);
							}
						}}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						required
						id="cardNumber"
						label="Card number"
						fullWidth
						autoComplete="cc-number"
						variant="standard"
						value={props.card}
						onChange={(event)=>{
							const input = event.target.value;
							if(input.length<25) {
								props.setCard(event.target.value);
							}
						}}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						required
						id="expDate"
						label="Expiry date"
						fullWidth
						autoComplete="cc-exp"
						variant="standard"
						value={props.expireDate}
						onChange={(event)=>{
							const input = event.target.value;
							if(input.length<10){
								props.setExpireDate(event.target.value);
							}
						}}
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						required
						id="cvv"
						label="CVV"
						helperText="Last three digits on signature strip"
						fullWidth
						autoComplete="cc-csc"
						variant="standard"
						value={props.cvv}
						onChange={(event)=>{
							const input = event.target.value;
							if(input.length<6){
								props.setCvv(input);
								console.log(event.target.value);
							}
						}}
					/>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

PaymentForm.propTypes = {
	nameOnCard: PropTypes.string.isRequired,
	setNameOnCard: PropTypes.func.isRequired,
	card: PropTypes.string.isRequired,
	setCard: PropTypes.func.isRequired,
	expireDate: PropTypes.string.isRequired,
	setExpireDate: PropTypes.func.isRequired,
	cvv: PropTypes.string.isRequired,
	setCvv: PropTypes.func.isRequired
};
