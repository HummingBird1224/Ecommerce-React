import React, { useState } from "react";
import { Alert, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import style from "./helpCenter.module.css";
import CardComponent from "../../components/cardComponent/cardComponent";
import SupportForm from "./supportForm/supportForm";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Axios from "axios";
import authService from "../../services/auth.service";

function helpCenter() {

	const [supportType, setSupportType] = useState();
	const [open, setOpen] = useState(false);
	const [subject, setSubject] = useState("");
	const [body, setBody] = useState("");
	const [errorHidden, setErrorHidden] = useState(true);
	const [successHidden, setSuccessHidden] = useState(true);

	function handleChange(event) {
		if (event.target.name === "body") {
			setBody(event.target.value);
		} else if (event.target.name === "subject") {
			setSubject(event.target.value);
		}
	}

	function handleSubmit() {
		if (body !== "" && subject !== "") {
			//todo: send support request to officer
			const requestBody = {
				description: body,
				type: supportType,
				subject: subject
			};
			// eslint-disable-next-line no-undef
			Axios.post(`${process.env.REACT_APP_API_URL}/producerUsers/addSupportRequest`, requestBody, {
				headers: { "x-auth-token": authService.getCurrentUser() }
			}).then(async (res) => {
				if (!res.data.success) {
					alert("Error Occured!");
					setOpen(false);
					setErrorHidden(false);
				} else {
					setOpen(false);
					setBody("");
					setSubject("");
					setSuccessHidden(false);
				}
			});
		} else {
			setOpen(false);
			setErrorHidden(false);

		}
	}

	function handleClose() {
		setOpen(false);
	}

	function handleOnClick0() {
		setSupportType(0);
		setOpen(true);
		setSuccessHidden(true);
		setErrorHidden(true);
	}

	function handleOnClick1() {
		setSupportType(1);
		setOpen(true);
		setSuccessHidden(true);
		setErrorHidden(true);
	}

	function handleOnClick2() {
		setSupportType(2);
		setOpen(true);
		setSuccessHidden(true);
		setErrorHidden(true);
	}

	function handleOnClick3() {
		setSupportType(3);
		setOpen(true);
		setSuccessHidden(true);
		setErrorHidden(true);
	}
	return (
		<Grid container>
			<Grid container mt={2} spacing={1} justifyContent="center">
				<Grid item xs={12} ml={5} mr={5} sx={{ backgroundImage: `url(${"https://img.freepik.com/free-vector/green-floral-background_53876-67015.jpg?w=2000"})` }}>
					<Typography variant="h2"><b>WELCOME TO <span className={style["green-font"]}>AGRIVENTURE</span> HELP CENTER.</b></Typography>
					<Typography variant="h2"><b>HOW CAN WE HELP?</b></Typography>
				</Grid>

				<Grid item xs={12} hidden={errorHidden}>
					<Alert severity="error">You can not submit an empty support ticket.</Alert>
				</Grid>

				<Grid item xs={12} hidden={successHidden}>
					<Alert severity="success">Your respond recorded successfully. our officer will reach you soon</Alert>
				</Grid>

				<Grid item xs={12} align="center" m={5}>
					<Link to="mySupport" style={{ textDecoration: "none" }} >
						<Button variant="contained">My Tickets</Button>
					</Link>

				</Grid>

				<Grid item xs={12} md={6} lg={4} align="center">
					<CardComponent heading={"Agricultural Support"} onClick={handleOnClick0} body={"Have any issues with your farm? We will help you to maximize the productivity and quality of your farm by providing expert bits of advice."} img={"https://tabmag2.objects.frb.io/kwsimage/_md/KWSImage_NT6.jpg"}></CardComponent>
				</Grid>

				<Grid item xs={12} md={6} lg={4} align="center" >
					<CardComponent heading={"Technical Support"} onClick={handleOnClick1} body={"It is ordinary to have issues when dealing with modern technologies. Our support team will help you to use the system precisely."} img={"https://lotusmana.com/wp-content/uploads/2021/09/575-min.png"}></CardComponent>
				</Grid>

				<Grid item xs={12} md={6} lg={4} align="center" >
					<CardComponent heading={"Report an Issue"} onClick={handleOnClick2} body={"Found any issue in the system? Your feedback is valuable to fix the issue as well as to improve the system"} img={"https://uploads-ssl.webflow.com/615af81f65d1ab72d2969269/61ccbd84fd85a14b0b927891_bug_reporting.png"}></CardComponent>
				</Grid>

				<Grid item xs={12} md={6} lg={4} align="center" >
					<CardComponent heading={"Marketplace Support"} onClick={handleOnClick3} body={"You can report any marketplace related issues using this portal. Our officers will help you to solve the issue"} img={"https://imageio.forbes.com/specials-images/imageserve/602d8c54e129ab12cc5ac480/Man-offers-marketplace-icon-on-virtual-screen-/960x0.jpg?format=jpg&width=960"}></CardComponent>
				</Grid>

			</Grid>

			<Grid item xs={12}>
				<SupportForm
					handleSubmit={handleSubmit}
					type={supportType}
					open={open}
					handleClose={handleClose}
					subject={subject}
					value={body}
					onChange={handleChange}
				/>
			</Grid>

			{/*<Grid item xs={12} mt={2}>*/}
			{/*	<Footer />*/}
			{/*</Grid>*/}

		</Grid>

	);
}

export default helpCenter;