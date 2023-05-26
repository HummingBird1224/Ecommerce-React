import React, {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import { Card, CardContent, CircularProgress, Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextInput from "../../../components/textInput/textInput";
// import SelectInput from "../../../components/selectInput/selectInput";
import SaveIcon from "@mui/icons-material/Save";
import Axios from "axios";
import {Link} from "react-router-dom";
import {Alert} from "@mui/lab";
import authService from "../../../services/auth.service";
import ImageUploader from "../../../components/imageUploader/ImageUploader";
import Avatar from "@mui/material/Avatar";

function EditMyProfileForm(){

	const [email,setEmail] = useState();
	const [telNo,setTelNo] = useState();
	const [address,setAddress] = useState();
	const [userType,setUserType] = useState(1);
	const [emailOrg,setEmailOrg] = useState();
	const [telNoOrg,setTelNoOrg] = useState();
	const [error,setError] = useState();
	const [errorHidden,setErrorHidden] = useState(true);
	const [firstName,setFirstName] = useState();
	const [lastName,setLastName] = useState();
	const [nic,setNic] = useState();
	const [addressOrg,setAddressOrg] = useState();
	const [isLoading,setIsLoading] = useState(true);
	const [userName,setUserName] = useState();
	const [id,setId] = useState();
	const [firstNameOrg,setFirstNameOrg] = useState();
	const [lastNameOrg,setLastNameOrg] = useState();
	const [district,setDistrict] = useState();
	const [city,setCity] = useState();
	const [imageURL,setImageURL] = useState();
	const [imageURLOrg,setImageURLOrg] = useState();


	useEffect(()=> {
		async function getUser() {
			// eslint-disable-next-line no-undef
			const user = await Axios.get(`${process.env.REACT_APP_API_URL}/allUsers/myProfile`,{
				headers: {"x-auth-token": authService.getCurrentUser()}
			});
			if (user.data.success) {
				setUserType(user.data.user.login.userType);
				setId(user.data.user._id);
				setUserName(user.data.user.login.userName);
				setFirstName(user.data.user.firstName);
				setLastName(user.data.user.lastName);
				setNic(user.data.user.nic);
				setEmail(user.data.user.email);
				setEmailOrg(user.data.user.email);
				setTelNoOrg(user.data.user.telNum);
				setTelNo(user.data.user.telNum);
				setAddress(user.data.user.address);
				setAddressOrg(user.data.user.address);
				setFirstNameOrg(user.data.user.firstName);
				setLastNameOrg(user.data.user.lastName);
				setImageURL(user.data.user.login.profilePicture);
				setImageURLOrg(user.data.user.login.profilePicture);
				if(user.data.user.login.userType === 0 ||user.data.user.login.userType === 2 ){
					setDistrict(user.data.user.district.name);
				}
				if(user.data.user.login.userType === 0){
					setCity(user.data.user.city);
				}
			} else {
				alert("Error occurred!");
			}
		}

		getUser();



		setIsLoading(false);
	},[]);

	function validateEmail(email)
	{
		if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
		{
			return (true);
		}
		return (false);
	}

	function validateNonEmpty(text){
		return text !== undefined && text !== "";
	}

	function validatePhoneNumber(num)
	{
		if(/^\d{10}$/.test(num))
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	function validateUnchanged(){
		return (email === emailOrg && imageURL === imageURLOrg && telNo === telNoOrg && address === addressOrg && firstName === firstNameOrg && lastName === lastNameOrg);
	}

	function handleSubmit(event){
		event.preventDefault();

		if(userType === 2){

			if(validateNonEmpty(email) &&  validateNonEmpty(firstName) && validateNonEmpty(lastName)){
				if(!validateEmail(email)){
					setError("Invalid Email Address!");
					setErrorHidden(false);
				}else if(validateUnchanged()){
					setError("Profile is already updated!");
					setErrorHidden(false);
				}else{
					const editValues = {
						id: id,
						email: email,
						firstName: firstName,
						lastName: lastName
					};

					// eslint-disable-next-line no-undef
					Axios.put(`${process.env.REACT_APP_API_URL}/officerUsers/updateMyProfile`,editValues,{
						headers: {"x-auth-token": authService.getCurrentUser()}
					}).then( async (res)=>{
						if(!res.data.success){
							alert("Error occured!");
						}
					});


					window.location.assign("/officer/myProfile/");
				}
			}else{
				setError("All fields should be completed!");
				setErrorHidden(false);
			}

		}else{

			if(validateNonEmpty(email) && validateNonEmpty(telNo) && validateNonEmpty(address) && validateNonEmpty(firstName) && validateNonEmpty(lastName)){
				if(!validateEmail(email)){
					setError("Invalid Email Address!");
					setErrorHidden(false);
				}else if(!validatePhoneNumber(telNo)){
					setError("Invalid Telephone number!");
					setErrorHidden(false);
				}else if(validateUnchanged()){
					setError("Profile is already updated!");
					setErrorHidden(false);
				}else{
					const editValues = {
						id: id,
						email: email,
						telNum: telNo,
						address: address,
						firstName: firstName,
						lastName: lastName
					};

					// eslint-disable-next-line no-undef
					Axios.put(`${process.env.REACT_APP_API_URL}/publicUsers/updateMyProfile`,editValues,{
						headers: {"x-auth-token": authService.getCurrentUser()}
					}).then( async (res)=>{
						if(!res.data.success){
							alert("Error occured!");
						}
					});

					// eslint-disable-next-line no-undef
					Axios.put(`${process.env.REACT_APP_API_URL}/allUsers/updateProfilePicture`,{id: authService.getCurrentUserId(), picture: imageURL},{
						headers: {"x-auth-token": authService.getCurrentUser()}
					}).then( async (res)=>{
						if(!res.data.success){
							alert("Error occured!");
						}
					});



					userType === 0 ? window.location.assign("/producer/myProfile/") : window.location.assign("/buyer/myProfile/");
				}
			}else{
				setError("All fields should be completed!");
				setErrorHidden(false);
			}

		}


	}

	function handleChange(event) {
		if (event.target.name === "email") {
			setEmail(event.target.value);
		} else if (event.target.name === "telNo") {
			setTelNo(event.target.value);
		} else if (event.target.name === "address") {
			setAddress(event.target.value);
		} else if (event.target.name === "firstName") {
			setFirstName(event.target.value);
		} else if (event.target.name === "lastName") {
			setLastName(event.target.value);
		}
	}

	return(
		<Container maxWidth={"sm"}>
			{isLoading ? (
				<Grid item align="center">
					<CircularProgress />
				</Grid>
			):(
				<div>
					<Paper variant="outlined" sx={{mt:"5pt", mb: "5pt"}}>
						<Grid container justifyContent="center" spacing={1}>
							<Grid item xs={12} justifyContent="center">
								<Typography variant="h5" align="center">Edit Profile</Typography>
							</Grid>
							<Grid item xs={12} align="center" justifyContent="center">
								{userType === 2 ?(
									<Grid item xs={12}>
										<Avatar
											alt="Sample User"
											src={imageURL}
											sx={{ width: 150, height: 150 }}
										/>
									</Grid>
								):(
									<ImageUploader imageURL={imageURL} setImageURL={setImageURL} height={150} width={150} fileName={authService.getCurrentUserId()} folderName={"profilePictures"} isCircular={true} />
								)}
								<Typography variant="h6">@{userName}</Typography>
							</Grid>
							<Grid item xs={12} sm={6} align="center">
								<Card variant="elevation" elevation={3} >
									<CardContent>
										<Typography variant="h6">NIC</Typography>
										<Typography variant="body2">{nic}</Typography>
									</CardContent>
								</Card>
							</Grid>
							<Grid item xs={12} sm={6} align="center" hidden={userType === 1}>
								<Card variant="elevation" elevation={3}>
									<CardContent>
										<Typography variant="h6">Location</Typography>
										<Typography variant="body2">{userType === 0 ? city + "-" + district : district}</Typography>
									</CardContent>
								</Card>
							</Grid>
						</Grid>
					</Paper>

					<Paper variant="outlined" sx={{mt:"5pt", mb: "5pt"}}>
						<Grid container spacing={1} mt={1} padding={1}>

							<Grid item xs={12} hidden={errorHidden}>
								<Alert severity="error">{error}</Alert>
							</Grid>

							<Grid item xs={12} sm={6} justifyContent="center">
								<TextInput name="firstName" label="First Name" value={firstName} onChange={handleChange} required={true}/>
							</Grid>

							<Grid item xs={12} sm={6} justifyContent="center">
								<TextInput name="lastName" label="Last Name" value={lastName} onChange={handleChange} required={true}/>
							</Grid>

							<Grid item xs={12} sm={6} justifyContent="center">
								<TextInput name="email" label="Email Address" value={email} onChange={handleChange} required={true}/>
							</Grid>

							<Grid hidden={userType === 2} item xs={12} sm={6} justifyContent="center">
								<TextInput name="telNo" label="Telephone Number" value={telNo} onChange={handleChange} required={true}/>
							</Grid>

							<Grid hidden={userType === 2} item xs={12} sm={6} justifyContent="center">
								<TextInput name="address" label="Address" value={address} onChange={handleChange} required={true}/>
							</Grid>






							{/*<Grid item xs={12} sm={6} justifyContent="center" hidden={userType===1} >*/}
							{/*	<SelectInput name="cropTypes" label="Crop Types" value={cropList} onChange={handleChange} required={true} options={allCropList} multi={true}/>*/}
							{/*</Grid>*/}

							<Grid item xs={12} align="center">
								<Link to={".."} style={{ textDecoration: "none" }}>
									<Button type="button" variant="outlined" sx={{m:"2pt"}}>Cancel</Button>
								</Link>
								<Button type="submit" variant="outlined" onClick={handleSubmit} sx={{m:"2pt"}} startIcon={<SaveIcon />}>Update Profile</Button>
							</Grid>
						</Grid>
					</Paper>
				</div>
			)}
		</Container>
	);
}

export default EditMyProfileForm;