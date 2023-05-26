import React from "react";
import {Link} from "react-router-dom";
import {Button, Grid, Typography} from "@mui/material";
import CustomTable from "../../components/customTable/customTable";
import PropTypes from "prop-types";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

function BuyMenuTable(props){
	// eslint-disable-next-line no-unused-vars
	const {data} = props;
	//Documentation => https://mui.com/x/react-data-grid/column-definition/
	const columns = [
		{ field: "id", headerName: "Order ID", width: 250 },
		{ field: "payment", headerName: "Payment", width: 150 },
		{ field: "paymentStatus", headerName: "Payment Status", width: 250 },
		{ field: "deliveryStatus", headerName: "Delivery Status", width: 250, sortable: false },
		{ field: "view",
			headerName: "View",
			sortable: false,
			filterable: false,
			align: "right",
			headerAlign: "center",
			renderCell: (params) => (
				<Link to={`${params.id}`} style={{ textDecoration: "none" }}>
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

	function noRowsOverlay(){
		return(
			<Grid item align="center"  xs={12} minHeight={1200}>
				<Typography variant={"h5"}>
					No Orders Available
				</Typography>
				<img height={250} src={"https://www.creativefabrica.com/wp-content/uploads/2021/01/04/Mustard-Sad-Vegetable-Cute-Kawaii-Graphics-7557389-1.jpg"}/>
			</Grid>
		);
	}

	function noResultOverlay(){
		return(
			<Grid item align="center"  xs={12} minHeight={1200}>
				<Typography variant={"h5"}>
					No Results
				</Typography>
				<img height={250} src={"https://www.creativefabrica.com/wp-content/uploads/2021/01/04/Mustard-Kiss-Vegetable-Cute-Kawaii-Graphics-7558057-1-580x387.jpg"}/>
			</Grid>
		);
	}

	const  orderArray = data;

	return(
		<Container>
			<Grid item>
				<Paper>
					<CustomTable
						rows = {orderArray}
						columns = {columns}
						enableCheckBox={false}
						customNoRowsOverlay={noRowsOverlay()}
						customNoResultsOverlay={noResultOverlay()}
					/>
				</Paper>
			</Grid>
		</Container>
	);
}

BuyMenuTable.propTypes = {
	data: PropTypes.array
};

export default BuyMenuTable;
