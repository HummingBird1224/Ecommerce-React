import React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import MyRefundRequestList from "./myRefundRequestList/myRefundRequestList";

function RefundRequestBuyer(){

	const [value, setValue] = React.useState("1");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Grid container>
			<Grid item xs={12} ml={5}>
				<Typography variant="h2"><b>REFUND REQUESTS</b></Typography>
				<Typography variant="body2">Make sure to handle refund requests before the refund deadline.
					After the deadline the request will automatically forward to an officer</Typography>
			</Grid>
			<Grid item xs={12} ml={2} align="center">
				<Box sx={{ width: "100%", maxWidth:"sm", typography: "body1" }}>
					<TabContext value={value}>
						<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
							<TabList onChange={handleChange} aria-label="lab API tabs example">
								<Tab label="Unread" value="1" />
								<Tab label="Ongoing" value="2" />
								<Tab label="Old" value="3" />
								<Tab label="Officer Notice" value="4" />
							</TabList>
						</Box>
						<TabPanel value="1"><MyRefundRequestList mode={value}/></TabPanel>
						<TabPanel value="2"><MyRefundRequestList mode={value}/></TabPanel>
						<TabPanel value="3"><MyRefundRequestList mode={value}/></TabPanel>
						<TabPanel value="4"><MyRefundRequestList mode={value}/></TabPanel>
					</TabContext>
				</Box>
			</Grid>
		</Grid>

	);
}

export default RefundRequestBuyer;