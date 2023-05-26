import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";

export default function Review(props) {
	const {order, addressDetails, paymentDetails} = props;
	const shippingEstimate = 1.5*360*order.item.quantity;
	console.log(order,addressDetails,paymentDetails);
	if(!order||!addressDetails||!paymentDetails){
		return ;
	}else{
		return (
			<React.Fragment>
				<Typography variant="h6" gutterBottom>
				Order summary
				</Typography>
				<List disablePadding>
					{
						<ListItem key={order} sx={{ py: 1, px: 0 }}>
							<ListItemText primary={order.item.name} secondary={order.item.crop} />
							<Typography variant="body2">{Intl.NumberFormat(
								"en"
							).
								format(order.order_price)}</Typography>
						</ListItem>
					}
					{
						<ListItem key={order} sx={{ py: 1, px: 0 }}>
							<ListItemText primary={"Shipping Estimate"} secondary={""} />
							<Typography variant="body2">{Intl.NumberFormat(
								"en"
							).
								format(shippingEstimate)}</Typography>
						</ListItem>
					}

					<ListItem sx={{ py: 1, px: 0 }}>
						<ListItemText primary="Total" />
						<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
							{Intl.NumberFormat(
								"en",
								{
									style: "currency",
									currency: "₹" }
							).
								format(shippingEstimate+order.order_price)}
						</Typography>
					</ListItem>
				</List>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
						Shipping
						</Typography>
						<Typography gutterBottom>{order.buyer.userName}</Typography>
						<Typography gutterBottom>{addressDetails.join(", ")}</Typography>
					</Grid>
					<Grid item container direction="column" xs={12} sm={6}>
						<Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
						Payment details
						</Typography>
						<Grid container>
							{paymentDetails.map((payment) => (
								<React.Fragment key={payment.name}>
									<Grid item xs={6}>
										<Typography gutterBottom>{payment.name}</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography gutterBottom>{payment.detail}</Typography>
									</Grid>
								</React.Fragment>
							))}
						</Grid>
					</Grid>
				</Grid>
			</React.Fragment>
		);

	}
}

Review.propTypes = {
	order: PropTypes.object.isRequired,
	addressDetails: PropTypes.object.isRequired,
	paymentDetails: PropTypes.object.isRequired
};
