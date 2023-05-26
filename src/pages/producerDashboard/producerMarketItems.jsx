import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import CustomTable from "../../components/customTable/customTable";
import { getProducerAllMarketItems } from "../../services/marketItemServices";



function ProducerMarketItems() {
	const [items, setItems] = useState([]);

	const columns = [
		{ field: "id", headerName: "Item ID", width: 250 },
		{ field: "title", headerName: "Title", width: 150 },
		{ field: "crop", headerName: "Crop", width: 150 },
		{ field: "fieldLocation", headerName: "State", width: 150 },
		{ field: "fieldDistrict", headerName: "District", width: 150 },
		{ field: "quantity", headerName: "Quantity", width: 100 },
		{ field: "expectedPrice", headerName: "Expected Price", width: 150 },
		{ field: "status", headerName: "Status", width: 150 },
		{
			field: "edit",
			headerName: "View",
			sortable: false,
			filterable: false,
			align: "right",
			headerAlign: "center",
			renderCell: (params) => (
				<Link to={`marketitem/${params.id}`} style={{ textDecoration: "none" }}>
					<Button
						color={"primary"}
						disableFocusRipple={true}
						variant="outlined"
						size="small"
						style={{ marginLeft: 10 }}
						tabIndex={params.hasFocus ? 0 : -1}
					>
						Open
					</Button>
				</Link>
			)
		}
	];

	useEffect(() => {
		async function getMarketItems() {
			// eslint-disable-next-line no-undef
			const itemData = await getProducerAllMarketItems();
			setItems(itemData.data);
		}
		getMarketItems();
	}, []);


	const itemList = items.map((itemData) => {
		return {
			id: itemData._id,
			title: itemData.name,
			crop:itemData.crop,
			fieldLocation: itemData.location.state,
			fieldDistrict: itemData.location.district,
			quantity: itemData.quantity,
			expectedPrice: itemData.expectedPrice,
			status: (
				itemData.status === true
					? "Active"
					: "Not Active"
			)
		};
	});

	return (
		<CustomTable
			rows={itemList}
			columns={columns}
			enableCheckBox={false}
		/>
	);
}

export default ProducerMarketItems;
