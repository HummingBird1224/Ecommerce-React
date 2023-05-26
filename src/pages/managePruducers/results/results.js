import * as React from "react";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import CustomTable from "../../../components/customTable/customTable";
import PropTypes from "prop-types";

const columns = [
	{ field: "userName", headerName: "User Name", width: 100 },
	{ field: "name", headerName: "Full Name", width: 150 },
	{ field: "email", headerName: "Email address", width: 150 },
	{ field: "nic", headerName: "NIC", width: 150 },
	{ field: "district", headerName: "District", width: 150 },
	{ field: "view",
		headerName: "View",
		sortable: false,
		filterable: false,
		align: "right",
		headerAlign: "center",
		renderCell: (params) => (
			<Link to={`profile/${params.row.id}`} style={{ textDecoration: "none" }}>
				<Button
					color={"primary"}
					disableFocusRipple={true}
					variant="outlined"
					size="small"
					style={{ marginLeft: 10 }}
					tabIndex={params.hasFocus ? 0 : -1}
				>Open</Button>
			</Link>
		)
	}
];


function Result(props) {

	return (
		<Box sx={{ height: 650, width: "100%" }} align="center">
			<CustomTable rows = {props.producers} columns = {columns} enableCheckBox={false}/>
		</Box>
	);
}

Result.propTypes = {
	producers: PropTypes.array
};

export default Result;