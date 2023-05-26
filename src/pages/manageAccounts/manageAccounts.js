import React, {useState} from "react";
import {CircularProgress, Divider, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AccountResults from "../../components/accountResults/accountResults";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import {useEffect} from "react";
import Axios from "axios";
import authService from "../../services/auth.service";
import Paper from "@mui/material/Paper";

function ManageAccounts(){

	const [officers,setOfficers] = useState([]);
	const [refresh,setRefresh] = useState(false);
	const [isLoading,setIsLoading] = useState();
	const officerTypes = ["Agricultural","Technical","System","Marketplace"];


	useEffect(() => {

		async function getOfficers() {
			// eslint-disable-next-line no-undef
			const officers = await Axios.get(`${process.env.REACT_APP_API_URL}/adminUser/getAllOfficers/`,
				{
					headers: { "x-auth-token": authService.getCurrentUser()
					}
				});
			if (officers.data.success) {
				let officerList = [];

				for(let i = 0; i < officers.data.officerList.length; i ++){
					const officer = officers.data.officerList[i];
					const newRow = {
						id: officer.login._id,
						name: officer.firstName + " " + officer.lastName,
						email: officer.email,
						state: officer.state,
						userName: officer.login.userName,
						nic: officer.nic,
						isActive: officer.login.isActive,
						officerType: officerTypes[officer.officerType]
					};
					officerList.push(newRow);
				}
				setOfficers(officerList);
			} else {
				alert("Error occurred!");
			}
		}

		getOfficers();


		setIsLoading(false);
	},[refresh]);

	
	return(
		<Container>
			{isLoading ? (
				<Grid item align="center">
					<CircularProgress />
				</Grid>
			):(
				<Grid container>
					<Grid item xs={12}>
						<Typography variant="h4">Manage Officers</Typography>
						<Divider />
					</Grid>
					<Grid item xs={12}>
						<Paper elevation={3} >
							<Grid container padding={1}>
								<Grid item xs={12} mt={2}>
									<Typography variant="h5">Officers List</Typography>
									<Divider />
								</Grid>

								<Grid item xs={12} mt={1}>
									<Link to = "addOfficer"  style={{ textDecoration: "none" }}>
										<Button variant="contained" color="success">Add New Officer</Button>
									</Link>
								</Grid>
								<Grid item xs={12} mt={1}>
									<AccountResults 
									officers={officers} 
									refresh={refresh} 
									setRefresh={setRefresh}
									/>
									<Divider sx={{mt:1}} />
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			)}

		</Container>

	);
}

export default ManageAccounts;