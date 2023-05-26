import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddressForm from "./addressForm";
import PaymentForm from "./paymentForm";
import Review from "./review";
import {LinkedButton} from "../../components/button/button";
import {useEffect, useState} from "react";
import {Stack} from "@mui/material";
import PropTypes from "prop-types";
import {updateOrderPayment} from "../../services/orderServices";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const steps = ["Shipping address", "Payment details", "Review your order"];

function getStepContent(
	step,
	firstname,
	setFirstname,
	lastname,
	setLastname,
	addressLn1,
	setAddressLn1,
	addressLn2,
	setAddressLn2,
	district,
	setDistrict,
	state,
	setState,
	zipCode,
	setZipCode,
	nameOnCard,
	setNameOnCard,
	card,
	setCard,
	expireDate,
	setExpireDate,
	cvv,
	setCvv,
	order
) {
	switch (step) {
	case 0:
		return <AddressForm
			firstname={firstname}
			setFirstname={setFirstname}
			lastname={lastname}
			setLastname={setLastname}
			addressLn1={addressLn1}
			setAddressLn1={setAddressLn1}
			addressLn2={addressLn2}
			setAddressLn2={setAddressLn2}
			district={district} setDistrict={setDistrict}
			state={state}
			setState={setState}
			zipCode={zipCode}
			setZipCode={setZipCode}
		/>;
	case 1:
		return <PaymentForm
			nameOnCard={nameOnCard}
			setNameOnCard={setNameOnCard}
			card={card} setCard={setCard}
			expireDate={expireDate}
			setExpireDate={setExpireDate}
			cvv={cvv}
			setCvv={setCvv}
		/>;
	case 2:
		return <Review
			order={order[0]}
			addressDetails={[addressLn1, addressLn2, district, zipCode]}
			paymentDetails={[
				{ name: "Card type", detail: "Visa" },
				{ name: "Card holder", detail: nameOnCard },
				{ name: "Card number", detail: `xxxx-xxxx-xxxx-${card.slice(-4)}` },
				{ name: "Expiry date", detail: expireDate }]}/>;
	default:
		throw new Error("Unknown step");
	}
}

export default function Checkout(props) {
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [addressLn1, setAddressLn1] = useState("");
	const [addressLn2, setAddressLn2] = useState("");
	const [district, setDistrict] = useState("");
	const [state, setState] = useState("");
	const [zipCode, setZipCode] = useState("");

	const [nameOnCard, setNameOnCard] = useState("");
	const [card, setCard] = useState("");
	const [expireDate, setExpireDate] = useState("");
	const [cvv, setCvv] = useState("");

	const [order, setOrder] = useState(null);
	// eslint-disable-next-line no-unused-vars
	const [isSubmitLoading, setSubmitLoading] = useState(false);

	useEffect(()=>{
		setOrder(props.order);
		if(order!=null){
			console.log( "checkout" , order);
		}
	}, [props.order]);

	const [activeStep, setActiveStep] = React.useState(0);

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};
//////  fix city here 
	const handleSubmit = async () =>{
		await setSubmitLoading(true);
		const addressDetails = [addressLn1, addressLn2];
		const data = {
			order_delivery_address: addressDetails.join(", "),
			order_delivery_city: district,
			order_delivery_zipcode: zipCode
		};
		const result = await updateOrderPayment(
			{
				orderId: order[0]._id,
				orderUpdate:data,
				paymentDetails:{
					c_name:nameOnCard,
					c_no: card,
					c_exp: expireDate,
					c_ccv: cvv
				}});
		await setSubmitLoading(false);
		console.log(result);
		if(result.error){
			alert(result.text);
		}else {
			handleNext();
		}
	};

	return (
		<Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
			<Paper  sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }} elevation={4}>
				<Typography component="h1" variant="h4" align="center">
						Checkout
				</Typography>
				<Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
					{steps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				<React.Fragment>
					{activeStep === steps.length ? (
						<React.Fragment>
							<Stack direction="row" alignItems="center" gap={1}>
								<CheckCircleIcon color={"success"}/>
								<Typography textAlign={"left"} variant={"h5"}>Payment Successful</Typography>
							</Stack>
							<Typography variant="subtitle1">
									Payment for order number {order._id} is Received. We have emailed your order
									confirmation, and will send you an update when your order has
									shipped.
							</Typography>
							<LinkedButton href={"/"} content={"Back to Dashboard"} variant={"contained"} sx={{color: "white"}}/>
						</React.Fragment>
					) : (
						<React.Fragment>
							{getStepContent(
								activeStep,
								firstname,
								setFirstname,
								lastname,
								setLastname,
								addressLn1,
								setAddressLn1,
								addressLn2,
								setAddressLn2,
								district,
								setDistrict,
								state,
								setState,
								zipCode,
								setZipCode,
								nameOnCard,
								setNameOnCard,
								card,
								setCard,
								expireDate,
								setExpireDate,
								cvv,
								setCvv,
								order
							)}
							<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
								{activeStep !== 0 && (
									<Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
											Back
									</Button>
								)}

								<Button
									variant="contained"
									onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
									sx={{ mt: 3, ml: 1 }}
								>
									{activeStep === steps.length - 1 ? "Place order" : "Next"}
								</Button>
							</Box>
						</React.Fragment>
					)}
				</React.Fragment>
			</Paper>
		</Container>
	);
}

Checkout.propTypes = {
	order: PropTypes.object
};
