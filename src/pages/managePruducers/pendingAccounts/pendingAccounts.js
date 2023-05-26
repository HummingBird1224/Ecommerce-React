import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Link from "@mui/material/Link";

const columns = [
	{ field: "id", headerName: "ID", width: 30 , renderCell: (params) => <Link href={"manageProducers/profile/" + params.row.user_id} color="inherit" underline="none">{params.row.id}</Link>},
	{
		field: "name",
		headerName: "Name",
		width: 200,
		editable: false,
		renderCell: (params) => <Link href={"manageProducers/profile/" + params.row.user_id} color="inherit" underline="none">{params.row.firstName + " " + params.row.lastName}</Link>
	},
	{
		field: "userName",
		headerName: "Username",
		type: "text",
		width: 200,
		editable: false,
		renderCell: (params) => <Link href={"manageProducers/profile/" + params.row.user_id} color="inherit" underline="none">{params.row.userName}</Link>
	},
	{
		field: "email",
		headerName: "Email",
		sortable: false,
		width: 200,
		renderCell: (params) => <Link href={"manageProducers/profile/" + params.row.user_id} color="inherit" underline="none">{params.row.email}</Link>
	}
];

const rows = [
	{ id: 0, lastName: "Pramuditha", firstName: "Nipun",  userName: "Blink99", email: "nipun@gmail.com" ,user_id:"633687cceec5158fd8112c1e" },
	{ id: 1, lastName: "Snow", firstName: "Jon",  userName: "jon99", email: "Jon@gmail.com" ,user_id:"633687cceec5158fd8112c1e" },
	{ id: 2, lastName: "Lannister", firstName: "Cersei",  userName: "cersei5", email: "Cersei@gmail.com" ,user_id:"633687cceec5158fd8112c1e"},
	{ id: 3, lastName: "Lannister", firstName: "Jaime",  userName: "jaimeL", email: "Jaime@gmail.com" ,user_id:"633687cceec5158fd8112c1e" },
	{ id: 4, lastName: "Stark", firstName: "Arya",  userName: "aryaS", email: "Arya@gmail.com" },
	{ id: 5, lastName: "Targaryen", firstName: "Daenerys",  userName: "daenerysT", email: "Daenerys@gmail.com" ,user_id:"633687cceec5158fd8112c1e" },
	{ id: 6, lastName: "Melisandre", firstName: null,  },
	{ id: 7, lastName: "Clifford", firstName: "Ferrara" },
	{ id: 8, lastName: "Frances", firstName: "Rossini" },
	{ id: 9, lastName: "Roxie", firstName: "Harvey" },
];

function Result() {
	return (
		<Box sx={{ height: 650, width: "100%" }} align="center">
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={10}
				rowsPerPageOptions={[10]}

				disableSelectionOnClick
				experimentalFeatures={{ newEditingApi: true }}
			/>
		</Box>
	);
}

export default Result;