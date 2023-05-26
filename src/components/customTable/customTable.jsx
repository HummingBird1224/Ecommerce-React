import * as React from "react";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import PropTypes from "prop-types";
import {Grid, Typography} from "@mui/material";

/**
 * CustomTable component.
 *
 * @props Defined below in propTypes
 * @returns {React.ReactElement} DataGrid Component.
 */
function CustomTable(props) {
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [filterModel, setFilterModel] = React.useState();
	const {rows, columns, enableSelectionOnRowClick, enableCheckBox, disableToolBar, preSortUsing} = props;

	function NoRowsOverlay() {
		if(!props.customNoRowsOverlay){
			return(
				<Grid item align="center"  xs={12} minHeight={1200}>
					<Typography variant={"h5"}>
						No Items Available
					</Typography>
					<img height={250} src={"https://www.creativefabrica.com/wp-content/uploads/2021/01/04/Mustard-Sad-Vegetable-Cute-Kawaii-Graphics-7557389-1.jpg"}/>
				</Grid>
			);
		}
		return(
			props.customNoRowsOverlay
		);

	}

	function NoResultsOverlay() {
		if(!props.customNoResultsOverlay){
			return(
				<Grid item align="center"  xs={12} minHeight={1200}>
					<Typography variant={"h5"}>
						No Results
					</Typography>
					<img height={250} src={"https://www.creativefabrica.com/wp-content/uploads/2021/01/04/Mustard-Kiss-Vegetable-Cute-Kawaii-Graphics-7558057-1-580x387.jpg"}/>
				</Grid>
			);
		}
		return(
			props.customNoResultsOverlay
		);
	}

	return (
		<div style={{ height: 400, width: "100%"}}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={rowsPerPage}
				onPageSizeChange={(newPageSize) => setRowsPerPage(newPageSize)}
				rowsPerPageOptions={[5, 10, 25, 100]}
				checkboxSelection = {enableCheckBox}
				disableSelectionOnClick = {!enableSelectionOnRowClick}
				getRowHeight={({ id}) => {
					if (id % 2 === 0) {
						return null;
					}
					return null;
				}}
				disableColumnMenu={true}
				components={{
					Toolbar: disableToolBar?null:GridToolbar,
					NoRowsOverlay,
					NoResultsOverlay
				}}
				filterModel={filterModel}
				onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
				initialState={preSortUsing!=null?{
					sorting: {
						sortModel: [preSortUsing],
					},
				}:null}
			/>
		</div>
	);
}
// To define the data type of the prop for prop validation in react.
CustomTable.propTypes = {
	/** The row items of the customTable should come in the form of an array of objects*/
	rows: PropTypes.array.isRequired,
	/** The columns should be an array of objects */
	columns: PropTypes.array.isRequired,
	/** The ability to make the row body clickable to make a selection*/
	enableSelectionOnRowClick: PropTypes.bool,
	/** Enable the checkbox column in the customTable*/
	enableCheckBox: PropTypes.bool,
	/** Disable the toolbar above the customTable*/
	disableToolBar: PropTypes.bool,
	/** Pass an object to presort the table in initial condition*/
	preSortUsing: PropTypes.object,
	customNoRowsOverlay: PropTypes.element,
	customNoResultsOverlay: PropTypes.element
};

export default CustomTable;
