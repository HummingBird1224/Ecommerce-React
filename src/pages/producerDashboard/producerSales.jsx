import React from "react";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import CustomTable from "../../components/customTable/customTable";

function producerItems(){
	//Documentation => https://mui.com/x/react-data-grid/column-definition/
	const columns = [
		{ field: "id", headerName: "Crop ID", width: 150 },
		{ field: "cropName", headerName: "Crop name", width: 150 },
		{ field: "fieldLocation", headerName: "Field Location", width: 150 },
		{ field: "amount", headerName: "Amount", width: 90},
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


	// Back end API call here
	const orderArray = [
		{ id: 1, cropName: "Beet", fieldLocation: "Mahanuwara", amount: 35 },
		{ id: 2, cropName: "Carrot", fieldLocation: "Kolonnawa", amount: 42 },
		{ id: 3, cropName: "Leeks", fieldLocation: "Mahiyanganaya", amount: 45 },
		{ id: 4, cropName: "Tomato", fieldLocation: "Nuwara eliya", amount: 16 },
		{ id: 5, cropName: "Rice", fieldLocation: "Panadura", amount: null },
		{ id: 6, cropName: "Beet", fieldLocation: "Jaffna", amount: 150 },
		{ id: 7, cropName: "Beet", fieldLocation: "Anuradhapura", amount: 44 },
		{ id: 8, cropName: "Tomato", fieldLocation: "Katharagama", amount: 36 },
		{ id: 9, cropName: "Cabbage", fieldLocation: "Maharagama", amount: 65 },
		{ id: 10, cropName: "Cabbage", fieldLocation: "Maharagama", amount: 65 },
		{ id: 11, cropName: "Cabbage", fieldLocation: "Maharagama", amount: 65 },
		{ id: 12, cropName: "Cabbage", fieldLocation: "Maharagama", amount: 65 },
		{ id: 13, cropName: "Cabbage", fieldLocation: "Maharagama", amount: 65 },
		{ id: 14, cropName: "Cabbage", fieldLocation: "Maharagama", amount: 65 },
		{ id: 15, cropName: "Cabbage", fieldLocation: "Maharagama", amount: 65 },
		{ id: 16, cropName: "Cabbage", fieldLocation: "Maharagama", amount: 65 },
		{ id: 17, cropName: "Cabbage", fieldLocation: "Maharagama", amount: 65 },
		{ id: 18, cropName: "Cabbage", fieldLocation: "Maharagama", amount: 65 },
		{ id: 19, cropName: "Cabbage", fieldLocation: "Maharagama", amount: 65 },
		{ id: 20, cropName: "Cabbage", fieldLocation: "Maharagama", amount: 65 },
		{ id: 21, cropName: "Cabbage", fieldLocation: "Maharagama", amount: 65 },
		{ id: 22, cropName: "Cabbage", fieldLocation: "Maharagama", amount: 65 },
		{ id: 23, cropName: "Cabbage", fieldLocation: "Maharagama", amount: 65 },
		{ id: 24, cropName: "Cabbage", fieldLocation: "Maharagama", amount: 65 },
		{ id: 25, cropName: "Cabbage", fieldLocation: "Maharagama", amount: 65 },
		{ id: 26, cropName: "Cabbage", fieldLocation: "Maharagama", amount: 65 },
	];

	return(

		<CustomTable rows = {orderArray} columns = {columns} enableCheckBox={false}/>

	);
}

export default producerItems;
