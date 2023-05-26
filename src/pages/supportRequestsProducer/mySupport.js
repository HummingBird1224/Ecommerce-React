import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {CircularProgress, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import Axios from "axios";
import authService from "../../services/auth.service";
import SupportRequestChatWindow from "../../components/chatWindow/supportRequestChatWindow";


function MySupport() {
	const [value, setValue] = useState("1");
	const [activeRequest,setActiveRequest] = useState([]);
	const [oldRequest,setOldRequest] = useState([]);
	const [isLoading,setIsLoading] = useState(true);
	const [myProfile,setMyProfile] = useState({firstName:"",login:{userType:-1}});
	const [refresh,setRefresh] = useState(0);

	useEffect(()=>{

		async function getMyRequests() {
			// eslint-disable-next-line no-undef
			const requests = await Axios.get(`${process.env.REACT_APP_API_URL}/producerUsers/mySupportRequest`,{
				headers: { "x-auth-token": authService.getCurrentUser()
				}});
			if(requests.data.success){
				setActiveRequest(requests.data.supportRequests.filter(request=>request.isActive));
				setOldRequest(requests.data.supportRequests.filter(request=>!request.isActive));
			}else{
				alert("Error occured!");
			}
		}

		getMyRequests();

		async function getMyProfile() {
			// eslint-disable-next-line no-undef
			const myProfile = await Axios.get(`${process.env.REACT_APP_API_URL}/publicUsers/myProfile`,{
				headers: { "x-auth-token": authService.getCurrentUser()
				}});
			if(myProfile.data.success){
				setMyProfile(myProfile.data.user);
			}else{
				alert("Error occured!");
			}
		}

		getMyProfile();
		setIsLoading(false);
	},[refresh]);


	const handleChange = (event, newValue) => {
		setValue(newValue);
	};


	return (
		<Grid container height={1000}>
			{isLoading ? (
				<Grid item align="center">
					<CircularProgress />
				</Grid>
			):(
				<div>
					<Grid item xs={12} ml={5}>
						<Typography variant="h2"><b>MY SUPPORT REQUESTS</b></Typography>
						<Typography variant="body2">Our officers will help you to make life easier</Typography>
					</Grid>
					<Grid item xs={12} ml={2} align="center">
						<Box sx={{ width: "100%", maxWidth:"sm", typography: "body1" }}>
							<TabContext value={value}>
								<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
									<TabList onChange={handleChange} aria-label="lab API tabs example">
										<Tab label="Support Requests" value="1" />
										<Tab label="Old Requests" value="3" />
									</TabList>
								</Box>
								<TabPanel value="1"><SupportRequestChatWindow refresh={refresh} setRefresh={setRefresh} user={myProfile} requests={activeRequest} mode={value} userType={1}/></TabPanel>
								<TabPanel value="3"><SupportRequestChatWindow user={myProfile} requests={oldRequest} mode={value} userType={1}/></TabPanel>
							</TabContext>
						</Box>
					</Grid>
					<Grid item xs={12} align="center" m={3}>
						<Link to=".." style={{ textDecoration: "none" }}>
							<Button variant="contained">Back</Button>
						</Link>
					</Grid>
				</div>
			)}
		</Grid>

	);
}

export default MySupport;
