import * as React from "react";
import Box from "@mui/material/Box";
import { Switch } from "@mui/material";
import CustomTable from "../customTable/customTable";
import PropTypes from "prop-types";
import Axios from "axios";
import authService from "../../services/auth.service";


function AccountResults(props) {


	function handleChange(event) {
		const current = props.officers.filter(officer => officer.id === event.target.id)[0].isActive;
		if (current) {
			// eslint-disable-next-line no-undef
			Axios.put(`${process.env.REACT_APP_API_URL}/adminUser/disableUser`, { id: event.target.id }, {
				headers: {
					"x-auth-token": authService.getCurrentUser()
				}
			}).then(async (res) => {
				if (!res.data.success) {
					alert("Error occured!");
				} else {
					props.setRefresh(!props.refresh);
				}
			});
		} else {
			// eslint-disable-next-line no-undef
			Axios.put(`${process.env.REACT_APP_API_URL}/adminUser/activeUser`, { id: event.target.id }, {
				headers: {
					"x-auth-token": authService.getCurrentUser()
				}
			}).then(async (res) => {
				if (!res.data.success) {
					alert("Error occured!");
				} else {
					props.setRefresh(!props.refresh);
				}
			});
		}

	}

	const columns = [
		{ field: "userName", headerName: "User Name", width: 100 },
		{ field: "name", headerName: "Full Name", width: 150 },
		{ field: "email", headerName: "Email address", width: 150 },
		{ field: "nic", headerName: "NIC", width: 150 },
		{ field: "state", headerName: "State", width: 150 },
		{ field: "officerType", headerName: "Type", width: 150 },
		{
			field: "Is Active",
			headerName: "Is Active",
			sortable: false,
			filterable: false,
			align: "right",
			headerAlign: "center",
			renderCell: (params) => (
				<Switch
					id={params.row.id}
					name={params.row.id}
					checked={params.row.isActive}
					onChange={handleChange}
				/>
			)
		}
	];

	return (
		<Box sx={{ height: 650, width: "100%" }} align="center">
			<CustomTable
				rows={props.officers}
				columns={columns}
				enableCheckBox={false}
			/>
		</Box>
	);
}

AccountResults.propTypes = {
	officers: PropTypes.array,
	refresh: PropTypes.bool,
	setRefresh: PropTypes.func
};

export default AccountResults;