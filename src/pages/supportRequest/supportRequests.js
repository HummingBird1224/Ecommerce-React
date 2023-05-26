import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import {Grid, Tabs} from "@mui/material";
import Typography from "@mui/material/Typography";
import ChatWindow from "../../components/chatWindow/chatWindow";
import {useEffect} from "react";
import Axios from "axios";
import authService from "../../services/auth.service";
import {useState} from "react";

function SupportRequests() {
	const [value, setValue] = useState("1");
	const [refresh,setRefresh] = useState(false);
	const [myType,setMyType] = useState();
	const [supportRequestList,setSupportRequestList] = useState([]);
	const [oldSupportRequestList,setOldSupportRequestList] = useState([]);
	const [refundRequestList,setRefundRequestList] = useState([]);
	const [oldRefundRequestList,setOldRefundRequestList] = useState([]);


	useEffect(()=>{

		async function getMyProfile() {
			// eslint-disable-next-line no-undef
			const officer = await Axios.get(`${process.env.REACT_APP_API_URL}/officerUsers/myProfile`,{
				headers: { "x-auth-token": authService.getCurrentUser()
				}});
			if(officer.data.success){
				setMyType(officer.data.user.officerType);
				setRefresh(true);
			}else{
				alert("Error occured!");
			}
		}

		getMyProfile();

	},[refresh]);

	useEffect(()=>{

		async function getSupportRequests() {
			// eslint-disable-next-line no-undef
			const supportRequests = await Axios.get(`${process.env.REACT_APP_API_URL}/officerUsers/supportRequestByType/${myType}`,{
				headers: { "x-auth-token": authService.getCurrentUser()
				}});
			if(supportRequests.data.success){
				setSupportRequestList(supportRequests.data.supportRequestList.filter(req=>req.isActive));
				setOldSupportRequestList(supportRequests.data.supportRequestList.filter(req=>!req.isActive));
			}else{
				alert("Error occured!");
			}
		}

		getSupportRequests();

		async function getRefundRequests() {
			if(myType === 3){
				// eslint-disable-next-line no-undef
				const refundRequests = await Axios.get(`${process.env.REACT_APP_API_URL}/officerUsers/getRefundRequests`,{
					headers: { "x-auth-token": authService.getCurrentUser()
					}});
				if(refundRequests.data.success){
					setRefundRequestList(refundRequests.data.refundRequestList.filter(req=>req.isActive));
					setOldRefundRequestList(refundRequests.data.refundRequestList.filter(req=>!req.isActive));
				}else{
					alert("Error occured!");
				}
			}else{
				setRefundRequestList([]);
				setOldRefundRequestList([]);
			}

		}

		getRefundRequests();

	},[myType,refresh]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Grid container>
			<Grid item xs={12} ml={5}>
				<Typography variant="h2"><b>SUPPORT REQUESTS</b></Typography>
				<Typography variant="body2">Make sure to handle these requests as soon as possible</Typography>
			</Grid>
			<Grid item xs={12} ml={2} align="center">
				<Box sx={{ width: "100%", typography: "body1" }}>
					<TabContext value={value}>
						<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
							<Tabs variant="scrollable" scrollButtons="auto" onChange={handleChange} aria-label="lab API tabs example">
								<Tab label="Support Requests" value="1" />
								<Tab label="Old Support Requests" value="2" />
								{myType === 3? (
									<Tab  label="Refund Requests" value="3" />):
									(<></>)
								}
								{myType === 3 ? (
									<Tab  label="Old Refund Requests" value="4" />):
									(<></>)
								}
							</Tabs>
						</Box>
						<TabPanel value="1"><ChatWindow refresh={refresh} setRefresh={setRefresh} requests={supportRequestList} mode={0} /></TabPanel>
						<TabPanel value="2"><ChatWindow refresh={refresh} setRefresh={setRefresh} requests={oldSupportRequestList} mode={0}/></TabPanel>
						<TabPanel value="3"><ChatWindow refresh={refresh} setRefresh={setRefresh} requests={refundRequestList} mode={1}/></TabPanel>
						<TabPanel value="4"><ChatWindow refresh={refresh} setRefresh={setRefresh} requests={oldRefundRequestList} mode={1} /></TabPanel>
					</TabContext>
				</Box>
			</Grid>
		</Grid>

	);
}

export default SupportRequests;
