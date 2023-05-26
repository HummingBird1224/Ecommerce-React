import React from "react";
import {Button} from "@mui/material";
import CustomTable from "../../components/customTable/customTable";

import {CircularProgress} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useEffect, useState} from "react";
import {getAgriData, deleteData} from "../../services/agridataServices";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

function deleteAgriData(id) {
	deleteData(id);
}

function agriDataTable(){
	//Documentation => https://mui.com/x/react-data-grid/column-definition/
	const [open, setOpen] = React.useState(false);
	const [id, setId] = React.useState();

	function handleClickOpen(){
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(false);
		console.log(open);
	};
	const handleDelete = () => {
		deleteAgriData(id);
		setOpen(false);
	};

	const [agriDataList,setAgriDataList] = useState([]);
	const [isLoading,setIsLoading] = useState(true);

	useEffect(()=>{
		async function getAgriDataList(){
			// eslint-disable-next-line no-undef
			const agriData = await getAgriData();
			setAgriDataList(agriData.data);
		}
		getAgriDataList();

		setIsLoading(false);
	},[agriDataList]);

	const columns = [
		{ field: "id", headerName: "ID", width: 150 },
		{ field: "cropType", headerName: "Crop type", width: 150 },
		{ field: "fieldDistrict", headerName: "District", width: 150 },
		{ field: "fieldCity", headerName: "City", width: 150 },
		{ field: "amount", headerName: "Amount", width: 90},
		{ field: "year", headerName: "Year", width: 90},
		{ field: "Delete",
			headerName: "",
			sortable: false,
			filterable: false,
			align: "right",
			headerAlign: "center",
			renderCell: (params) => (
				<Button onClick={()=>{
					setId(params.id);
					handleClickOpen();
				}}
				color={"primary"}
				disableFocusRipple={true}
				variant="outlined"
				size="small"
				style={{ marginLeft: 10 }}
				tabIndex={params.hasFocus ? 0 : -1}
				>Delete</Button>
			)
		}

	];

	const agriData = agriDataList.map((agriData) => {
		return {id:agriData._id, cropType:agriData.cropType.name, fieldDistrict:agriData.district.name, fieldCity:agriData.city, amount:agriData.cropAmount, year:agriData.year};});

	return(
		<div>
			{isLoading ? (
				<Grid item align="center">
					<CircularProgress />
				</Grid>
			):(
				<div>

					<CustomTable rows = {agriData} columns = {columns} enableCheckBox={true}/>

					<Dialog
						open={open}
						onClose={handleClose}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">
							{"Delete this data entry?"}
						</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								Are you sure you want to delete this entry. Deleting this will remove the data entry from the database and you cannot retreive it.
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose}>No</Button>
							<Button onClick={handleDelete} autoFocus>
								Yes
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			)}
		</div>

	);
}

export default agriDataTable;
