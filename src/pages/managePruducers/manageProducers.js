import React, { useState } from "react";
import { CircularProgress, Divider, Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Results from "./results/results";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import Axios from "axios";
import authService from "../../services/auth.service";

function ManageProducers() {

	const [producers, setProducers] = useState([]);
	const [pendingProducers, setPendingProducers] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [isLoading, setIsLoading] = useState();

	useEffect(() => {

		async function getProducers() {
			// eslint-disable-next-line no-undef
			const producers = await Axios.get(`${process.env.REACT_APP_API_URL}/officerUsers/getAllProducers/`,
				{
					headers: {
						"x-auth-token": authService.getCurrentUser()
					}
				});
			if (producers.data.success) {

				let active = [];
				let pending = [];

				for (let i = 0; i < producers.data.producerList.length; i++) {
					const producer = producers.data.producerList[i];
					console.log(producer);
					const newRow = {
						id: producer.login._id,
						name: producer.firstName + " " + producer.lastName,
						email: producer.email,
						district: producer.district,
						userName: producer.login.userName,
						nic: producer.nic
					};
					if (producer.login.isActive) {
						active.push(newRow);
					} else {
						pending.push(newRow);
					}
				}
				setProducers(active);
				setPendingProducers(pending);
			} else {
				alert("Error occurred!");
			}
		}

		getProducers();


		setIsLoading(false);
	}, [refresh]);


	return (
		<Container>


			{isLoading ? (
				<Grid item align="center">
					<CircularProgress />
				</Grid>
			) : (

				<Grid container>
					<Grid item xs={12} mt={2}>
						<Typography variant="h4">Manage Producers</Typography>
						<Divider />
					</Grid>

					<Grid item xs={12}>
						<Paper elevation={3} >
							<Grid container padding={1}>
								<Grid item xs={12} mt={2}>
									<Typography variant="h5">Producers List</Typography>
									<Divider />
								</Grid>

								<Grid item xs={12} mt={1}>
									<Link to="addProducer" style={{ textDecoration: "none" }}>
										<Button variant="contained" color="success">Add New Producer</Button>
									</Link>
								</Grid>
								<Grid item xs={12} mt={1}>
									<Results
										producers={producers}
										refresh={refresh}
										setRefresh={setRefresh}
									/>
									<Divider sx={{ mt: 1 }} />
								</Grid>
							</Grid>
						</Paper>
					</Grid>

					<Grid item xs={12}>
						<Paper elevation={3} >
							<Grid container padding={1}>
								<Grid item xs={12} mt={2}>
									<Typography variant="h5">Pending Accounts</Typography>
									<Divider />
								</Grid>

								<Grid item xs={12} mt={1}>
									<Results producers={pendingProducers} refresh={refresh} setRefresh={setRefresh} />
									<Divider sx={{ mt: 1 }} />
								</Grid>
							</Grid>
						</Paper>
					</Grid>

				</Grid>
			)}
		</Container>

	);
}



export default ManageProducers;