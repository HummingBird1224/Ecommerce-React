import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import CustomTable from "../../components/customTable/customTable";
import { getProducerAllListingss } from "../../services/itemServices";



function producerItems() {
	const [items, setItems] = useState([]);

	const columns = [
		{ field: "id", headerName: "Item ID", width: 250 },
		{ field: "title", headerName: "Title", width: 150 },
		{ field: "crop", headerName: "Crop", width: 150 },
		{ field: "fieldLocation", headerName: "State", width: 150 },
		{ field: "fieldDistrict", headerName: "District", width: 150 },
		{ field: "quantity", headerName: "Quantity", width: 100 },
		{ field: "minBid", headerName: "Minimum bid", width: 150 },
		{ field: "status", headerName: "Status", width: 150 },
		{
			field: "edit",
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
					>
						Open
					</Button>
				</Link>
			)
		}
	];

	useEffect(() => {
		async function getItemData() {
			// eslint-disable-next-line no-undef
			const itemData = await getProducerAllListingss();
			setItems(itemData.data);
		}
		getItemData();
	}, []);


	const itemList = items.map((itemData) => {
		return {
			id: itemData._id,
			title: itemData.name,
			crop:itemData.crop,
			fieldLocation: itemData.location.state,
			fieldDistrict: itemData.location.district,
			quantity: itemData.quantity,
			minBid: itemData.minimum_bid,
			status: itemData.state
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

export default producerItems;
