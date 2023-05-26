import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import {useState} from "react";

function SearchBar(props) {
	const [inputSearch, setInputSearch] = useState("");
	const {onSearchIconClick, onCloseIconClick} = props;
	const onSearchBarChange = (event)=>{
		const search = event.target.value;
		setInputSearch(search);
	};

	const onSearchSubmit = ()=>{
		onSearchIconClick(inputSearch);
	};

	const onCloseSubmit = ()=>{
		setInputSearch("");
		onCloseIconClick();
	};
	return (
		<Paper elevation={2}
			component="form"
			sx={{ p: "2px 4px", display: "flex", alignItems: "center"}}
		>
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder="Search Item"
				inputProps={{ "aria-label": "marketplace search bar" }}
				onChange={onSearchBarChange}
				value={inputSearch}
			/>
			{inputSearch!=""?(<IconButton type="button" sx={{p: "10px"}} aria-label="search" onClick={onCloseSubmit}>
				<CloseIcon/>
			</IconButton>):""}
			<IconButton type="button" sx={{ p: "10px" }} aria-label="search" onClick={onSearchSubmit}>
				<SearchIcon />
			</IconButton>
		</Paper>
	);
}

SearchBar.propTypes = {
	onSearchIconClick: PropTypes.func,
	onCloseIconClick: PropTypes.func
};

export default SearchBar;
