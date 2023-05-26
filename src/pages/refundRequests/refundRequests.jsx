import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import {useEffect} from "react";
import Axios from "axios";
import authService from "../../services/auth.service";
import RefundRequestList from "../../components/chatWindow/refundRequestChatWindow";

function RefundRequests() {
	const [value, setValue] = useState("1");
	const [oldRequest,setOldRequest] = useState([]);
	const [activeRequest,setActiveRequest] = useState([]);
	const [refresh,setRefresh] = useState(false);

	useEffect(()=>{

		async function getMyRequests() {
			// eslint-disable-next-line no-undef
			const requests = await Axios.get(`${process.env.REACT_APP_API_URL}/producerUsers/myRefundRequest`,{
				headers: { "x-auth-token": authService.getCurrentUser()
				}});
			console.log(requests.data);
			if(requests.data.success){
				setActiveRequest(requests.data.refundRequest.filter(request=>request.isActive));
				setOldRequest(requests.data.refundRequest.filter(request=>!request.isActive));
			}else{
				alert("Error occured!");
			}
		}

		getMyRequests();

	},[refresh]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Grid container data-testid={"RefundRequests"}>
			<Grid item xs={12} ml={5}>
				<Typography variant="h2"><b>REFUND REQUESTS</b></Typography>
				<Typography variant="body2">Make sure to handle refund requests before the refund deadline.</Typography>
			</Grid>
			<Grid item xs={12} ml={2} align="center" height={1000}>
				<Box sx={{ width: "100%", maxWidth:"sm", typography: "body1" }}>
					<TabContext value={value}>
						<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
							<TabList onChange={handleChange} aria-label="lab API tabs example">
								<Tab label="Active" value="1" />
								<Tab label="Old" value="2" />
							</TabList>
						</Box>
						<TabPanel value="1" ><RefundRequestList requests={activeRequest} refresh={refresh} setRefresh={setRefresh} mode={value}/></TabPanel>
						<TabPanel value="2" ><RefundRequestList requests={oldRequest} refresh={refresh} setRefresh={setRefresh} mode={value}/></TabPanel>
					</TabContext>
				</Box>
			</Grid>
		</Grid>

	);
}

export default RefundRequests;
