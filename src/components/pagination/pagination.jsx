import React from "react";
import {Pagination} from "@mui/material";
import PropTypes from "prop-types";
import _ from "lodash";

function CustomPagination (props){
	const { itemsCount, pageSize, onPageChange, currentPage} = props;
	const pagesCount = Math.ceil(itemsCount / pageSize);
	if (pagesCount === 1) return null;
	const pages = _.range(1, pagesCount + 1);
	return (
		<Pagination count={pages.length} shape="rounded" page={currentPage} onChange={(event, page)=>{onPageChange(page);}}/>
	);
}

CustomPagination.propTypes = {
	itemsCount: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	currentPage: PropTypes.number.isRequired
};

export default CustomPagination;