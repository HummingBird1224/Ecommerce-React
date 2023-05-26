import React, { useState } from "react";
import { CircularProgress, Divider, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TextInput from "../../components/textInput/textInput";
import SelectInput from "../../components/selectInput/selectInput";
import Button from "@mui/material/Button";
import { Alert } from "@mui/lab";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Axios from "axios";
import ListInput from "../../components/selectInput/cityInput";
import authService from "../../services/auth.service";

function AddProducers() {

	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [telephoneNumber, setTelephoneNumber] = useState();
	const [nic, setNic] = useState();
	const [address, setAddress] = useState();
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const [error, setError] = useState();
	const [hidden, setHidden] = useState(true);
	const [states, setStates] = useState([]);
	const [state, setState] = useState();
	const [district, setDistrict] = useState();
	const [districts, setDistricts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [userNames, setUsernames] = useState([]);

	useEffect(() => {

		async function getUserNames() {
			// eslint-disable-next-line no-undef
			const userNames = await Axios.get(`${process.env.REACT_APP_API_URL}/users/getUserNames`);
			setUsernames(userNames.data.map(data => data.userName));
		}
		getUserNames();

		async function getStates() {
			// eslint-disable-next-line no-undef
			const states = await Axios.get(`${process.env.REACT_APP_API_URL}/guestUsers/getAllStates`);
			setStates(states.data.statesList);
		}

		getStates();

		setIsLoading(false);
	}, []);

	function onChange(event) {
		if (event.target.name === "firstName") {
			setFirstName(event.target.value);
		} else if (event.target.name === "lastName") {
			setLastName(event.target.value);
		} else if (event.target.name === "email") {
			setEmail(event.target.value);
		} else if (event.target.name === "telephone") {
			setTelephoneNumber(event.target.value);
		} else if (event.target.name === "nic") {
			setNic(event.target.value);
		} else if (event.target.name === "address") {
			setAddress(event.target.value);
		} else if (event.target.name === "username") {
			setUsername(event.target.value);
		} else if (event.target.name === "password") {
			setPassword(event.target.value);
		} else if (event.target.name === "conPassword") {
			setConfirmPassword(event.target.value);
		} else if (event.target.name === "state") {
			setState(event.target.value);
			setDistricts(states.filter(state => state._id === event.target.value)[0].districts);
			setDistrict();
		} else if (event.target.name === "district") {
			setDistrict(event.target.value);
		}

		setHidden(true);
	}

	function validateEmail(email) {
		//	if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
		//	{
		return (true);
		//	}
		//	return (false);
	}

	function validateNonEmpty(text) {
		return text !== undefined && text !== "";
	}


	function validatePhoneNumber(num) {
		//	if(/^\d{10}$/.test(num))
		//	{
		return true;
		//	}
		//	else
		//	{
		//	return false;
		//	}
	}

	function validateUsername() {
		if (userNames.includes(username)) {
			return false;
		}
		return (username !== undefined && username !== "");
	}

	function validatePassword() {
		return (password === confirmPassword);
	}

	function handleSubmit() {
		if (validateNonEmpty(firstName) && validateNonEmpty(lastName)
			&& validateNonEmpty(email) && validateNonEmpty(telephoneNumber)
			&& validateNonEmpty(nic) && validateNonEmpty(address) && validateNonEmpty(state) && validateNonEmpty(district)
			&& validateNonEmpty(username) && validateNonEmpty(password) && validateNonEmpty(confirmPassword)) {
			if (!validateEmail(email)) {
				setError("Invalid Email!");
				setHidden(false);
			} else if (!validatePhoneNumber(telephoneNumber)) {
				setError("Invalid Telephone Number!");
				setHidden(false);
			} else if (!validateUsername(username)) {
				setError("Username already exists!");
				setHidden(false);
			} else if (!validatePassword()) {
				setError("Passwords are not match!");
				setHidden(false);
			} else if (password.length < 1) {
				setError("Passwords is too short!");
				setHidden(false);
			} else {
				const userReqestBody = {
					userName: username,
					password: password,
					userType: 0,
					isActive: true
				};

				// eslint-disable-next-line no-undef
				Axios.post(`${process.env.REACT_APP_API_URL}/officerUsers/addUser`, userReqestBody, {
					headers: {
						"x-auth-token": authService.getCurrentUser()
					}
				}).then(async (res) => {
					if (!res.data.success) {
						alert("Error occured!");
					} else {
						const producerRequestBody = {
							firstName: firstName,
							lastName: lastName,
							email: email,
							address: address,
							nic: nic,
							telNum: telephoneNumber,
							userName: username,
							state: state,
							district: district,
							login: res.data.user._id
						};
						// eslint-disable-next-line no-undef
						Axios.post(`${process.env.REACT_APP_API_URL}/officerUsers/addProducer`, producerRequestBody, {
							headers: {
								"x-auth-token": authService.getCurrentUser()
							}
						}).then(async (res) => {
							if (!res.data.success) {
								alert("Error occured!");
							} else {
								window.location.assign("/officer/manageProducers");
							}
						});
					}
				});
			}
		} else {
			setError("Fill all fields!");
			setHidden(false);
		}
	}

	return (
		<Container>
			{isLoading ? (
				<Grid item align="center">
					<CircularProgress />
				</Grid>
			) : (
				<Grid container>
					<Grid item xs={12}>
						<Typography variant="h2"><span style={{ color: "green" }}>Producer</span> Form</Typography>
						<hr />
					</Grid>

					<Grid item xs={12} hidden={hidden}>
						<Alert severity="error">{error}</Alert>
					</Grid>

					<Grid item xs={12}>
						<Typography variant="h5" m={1}>Producer Details</Typography>
						<Divider />
						<Paper variant="elevation" elevation={3}>
							<Grid container mt={2} spacing={1} padding={1}>
							<Grid item xs={12} md={6}>
									{/* eslint-disable-next-line react/prop-types */}
									<TextInput
										name="nic"
										label="FPO Name"
										value={nic}
										onChange={onChange}
										required={true}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									{/* eslint-disable-next-line react/prop-types */}
									<TextInput
										name="email"
										label="Email"
										value={email}
										onChange={onChange}
										required={true}
										type="email"
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									{/* eslint-disable-next-line react/prop-types */}
									<TextInput name="firstName"
										label="First Name"
										value={firstName}
										onChange={onChange}
										required={true}
									/>
								</Grid>

								<Grid item xs={12} md={6}>
									{/* eslint-disable-next-line react/prop-types */}
									<TextInput name="lastName"
										label="Last Name"
										value={lastName}
										onChange={onChange}
										required={true}
									/>
								</Grid>

							

								<Grid item xs={12} md={6}>
									{/* eslint-disable-next-line react/prop-types */}
									<TextInput
										name="telephone"
										label="Mobile Number"
										value={telephoneNumber}
										onChange={onChange}
										required={true}
										type="tel" />
								</Grid>

							

								<Grid item xs={12} md={6}>
									{/* eslint-disable-next-line react/prop-types */}
									<TextInput
										name="address"
										label="Address"
										value={address}
										onChange={onChange}
										required={true}
									/>
								</Grid>

								<Grid item xs={12} md={6}>
									<SelectInput
										name="state"
										label="State"
										value={state}
										onChange={onChange}
										required={true}
										options={states}
										multi={false}
									/>
								</Grid>

								<Grid item hidden={districts.length === 0} xs={12} md={6}>
									<ListInput
										name="district"
										label="District"
										value={district}
										onChange={onChange}
										required={true}
										options={districts}
										multi={false}
									/>
								</Grid>
							</Grid>
						</Paper>
					</Grid>

					<Grid item xs={12} mt={2}>
						<Typography variant="h5" m={1}>Logging Details</Typography>
						<Divider />
						<Paper variant="elevation" elevation={3}>
							<Grid container mt={2} spacing={1} padding={1}>
								<Grid item xs={12} >
									{/* eslint-disable-next-line react/prop-types */}
									<TextInput
										name="username"
										label="User Name"
										value={username}
										onChange={onChange}
										required={true}
									/>
								</Grid>

								<Grid item xs={12} md={6}>
									{/* eslint-disable-next-line react/prop-types */}
									<TextInput
										name="password"
										label="Password"
										value={password}
										onChange={onChange}
										required={true}
										type="password"
									/>
								</Grid>

								<Grid item xs={12} md={6}>
									{/* eslint-disable-next-line react/prop-types */}
									<TextInput
										name="conPassword"
										label="Confirm Password"
										value={confirmPassword}
										onChange={onChange}
										required={true}
										type="password"
									/>
								</Grid>
							</Grid>
						</Paper>
					</Grid>

					<Grid item xs={12} mt={1} align="right">
						<Link to=".." style={{ textDecoration: "none" }}>
							<Button type="submit" sx={{ m: 1 }} variant="contained">Cancel</Button>
						</Link>
						<Button
							type="submit"
							sx={{ m: 1 }}
							variant="contained"
							onClick={handleSubmit}
						>
							Submit
						</Button>
					</Grid>

				</Grid>
			)}

		</Container>

	);
}

export default AddProducers;