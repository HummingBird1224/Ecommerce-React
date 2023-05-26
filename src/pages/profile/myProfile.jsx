import React, {useEffect, useState} from "react";
// import ProfileView from "./profileView/profileView";
import {
	CircularProgress,
	Grid
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import {Link} from "react-router-dom";
import Axios from "axios";
import ProfileView from "./profileView/profileView";
import Container from "@mui/material/Container";
import {Alert} from "@mui/lab";
import authService from "../../services/auth.service";
import EditPassword from "../../components/editPassword/editPassword";
// eslint-disable-next-line no-undef

function MyProfile(){

	const [username,setUsername] = useState();
	const [userType,setUserType] = useState();
	const [isLoading,setIsLoading] = useState(true);
	const [firstName,setFirstName] = useState();
	const [lastName,setLastName] = useState();
	const [nic,setNic] = useState();
	const [email,setEmail] = useState();
	const [telNum,setTelNum] = useState();
	const [address,setAddress] = useState();
	const [state,setState] = useState();
	const [district,setDistrict] = useState();
	const [isExsist,setIsExsist] = useState();
	const [imageURL,setImageURL] = useState();

	useEffect(() => {

		async function getUser() {
			// eslint-disable-next-line no-undef
			const user = await Axios.get(`${process.env.REACT_APP_API_URL}/allUsers/myProfile/`,
				{
					headers: { "x-auth-token": authService.getCurrentUser()
					}
				});
			if (user.data.success) {
				console.log(user.data.user);
				setUserType(user.data.user.login.userType);
				setUsername(user.data.user.login.userName);
				setImageURL(user.data.user.login.profilePicture);
				setFirstName(user.data.user.firstName);
				setLastName(user.data.user.lastName);
				setNic(user.data.user.nic);
				setEmail(user.data.user.email);
				setTelNum(user.data.user.telNum);
				setAddress(user.data.user.address);
				if(user.data.user.login.userType === 0 ||user.data.user.login.userType === 2 ){
					setState(user.data.user.state.name);
				}
				if(user.data.user.login.userType === 0){
					setDistrict(user.data.user.district);
				}
				setIsExsist(true);
			} else {
				setIsExsist(false);
				alert("Error occurred!");
			}
		}

		getUser();


		setIsLoading(false);
	},[]);




	return(
		<Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
			{isLoading ? (
				<Grid item align="center">
					<CircularProgress />
				</Grid>
			):(
				<Grid container justifyContent="center">

					<Grid item xs={12} hidden={isExsist}>
						<Alert severity="error" >User not found!</Alert>
					</Grid>

					<Grid item xs={12} hidden={!isExsist}>
						<ProfileView firstName = {firstName}
							lastName={lastName}
							email={email} nic={nic}
							address={address}
							userName={username}
							telephoneNumber={telNum}
							state={state}
							district={district}
							userType={userType}
							image={imageURL}
							showSecrets={true}/>
					</Grid>

					<Grid item xs={12} md={6} mt={2}  align="center" hidden={!isExsist}>
						<Paper elevation={3} sx={{width: "100%", p: "5px"}}>
							<Link to={"edit"}  style={{ textDecoration: "none" }}>
								<Button variant="outlined" color="primary" startIcon={<EditIcon />} sx={{m: "5px"}}>
									Edit
								</Button>
							</Link>

							<EditPassword />
						</Paper>
					</Grid>


				</Grid>
			)}
		</Container>
	);
}

export default MyProfile;