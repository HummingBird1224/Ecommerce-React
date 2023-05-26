import React, {useEffect, useState} from "react";
import { CircularProgress, Grid, Typography} from "@mui/material";
import MarketPlacePlaceCard from "./MarketPlacePlaceCard";
import CustomPagination from "../../components/pagination/pagination";
import {paginate} from "../../util/paginate";
import SearchBar from "../../components/searchBar/searchBar";
import MarketPlaceFilters from "./MarketPlaceFilters";
import _ from "lodash";
import { getAllMarketItems } from "../../services/marketItemServices";

function MarketPlace(){
	const [isPageChange, setIsPageChange] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setLoading] = useState(true);
	const [rawItemData, setItemData] = useState([]);
	const [pagedData, setPaginateData] = useState([]);
	const [filteredData, setFilterData] = useState([]);
	const [filteredCustomData, setFilterCustomData] = useState([-1,-1,-1,-1]);
	const [sortParameters, setSortParameters] = useState([-1,-1,-1,-1]);
	const [sortedData, setSortedData] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchData, setSearchData] = useState([]);
	const pageSize = 12;

	useEffect(()=>{
		async function getAllItems(){
			setLoading(true);
			const items = await getAllMarketItems();
			setItemData(items.data);
		}
		getAllItems();
	},[isPageChange]);

	// Sort Data
	useEffect(()=>{
		setPaginateData(paginate(searchData, currentPage, pageSize));
		setLoading(false);
	}, [searchData]);

	// Paginate Data
	useEffect(()=>{
		sortData();
	},[filteredData, sortParameters]);

	// setupFiltered Data
	useEffect(()=>{
		setFilterData(rawItemData);
	},[rawItemData]);

	// On change page
	useEffect(()=>{
		setPaginateData(paginate(searchData, currentPage, pageSize));
	}, [currentPage]);

	// Search Filter Change
	useEffect(()=>{
		searchFilter(sortedData);
	}, [searchTerm, sortedData]);

	function handlePageChange(currentPage){
		setCurrentPage(currentPage);
	}

	function costFilter(range, dataArray){

		const data = dataArray;
		const filteredData = data.filter(
			(ele)=>{
				if(range == "0"){
					return ele;
				}
				else if(range == "1" && ele.expectedPrice < 100000){
					return ele;
				}else if(range == "2" && ele.expectedPrice >= 100000 && ele.expectedPrice < 1000000){
					return ele;
				}else if(range == "3" && ele.expectedPrice < 10000000 && ele.expectedPrice >= 1000000){
					return ele;
				}else if(range == "4" && ele.expectedPrice >= 10000000){
					return ele;
				}else if(range == "5" ){
					if(filteredCustomData[0]== -1 || filteredCustomData[1]==-1){
						return ele;
					}else {
						if(ele.expectedPrice < +filteredCustomData[1] && ele.expectedPrice >= +filteredCustomData[0]){
							return ele;
						}
					}
				}
			});
		return filteredData;
	}
	const customQuantityFilter=(range)=>{
		setFilterCustomData([filteredCustomData[0], filteredCustomData[1], range[0], range[1]]);
	};

	const customBidFilter=(range)=>{
		setFilterCustomData([range[0], range[1], filteredCustomData[2], filteredCustomData[3]]);
	};
	function quantityFilter(range, dataArray){
		const data = dataArray;
		const filteredData = data.filter(
			(ele)=>{
				if(range == "0"){
					return ele;
				}
				else if(range == "1" && ele.quantity < 100){
					return ele;
				}else if(range == "2" && ele.quantity >= 100 && ele.quantity < 1000){
					return ele;
				}else if(range == "3" && ele.quantity < 10000 && ele.quantity >= 1000){
					return ele;
				}else if(range == "4" && ele.quantity >= 10000){
					return ele;
				}else if(range == "5"){
					if(filteredCustomData[2]== -1 || filteredCustomData[3]==-1){
						return ele;
					}else {
						if(ele.quantity < +filteredCustomData[3] && ele.quantity >= +filteredCustomData[2]){
							return ele;
						}
					}
				}
			});
		return filteredData;
	}

	function districtFilter(range, dataArray){
		const data = dataArray;
		const filteredData = data.filter(
			(ele)=>{
				if(range.has(ele.location.state)){
					return ele;
				}
				return;
			});
		return filteredData;
	}

	function cropFilter(range, dataArray){
		const data = dataArray;
		const filteredData = data.filter(
			(ele)=>{
				if(range.has(ele.crop)){
					return ele;
				}
				return;
			});
		return filteredData;
	}

	function onFilterChange(data){
		let filteredData = rawItemData;
		const {expectedPrice, quantity, district, crops} = data;
		filteredData = costFilter(expectedPrice, filteredData);
		filteredData = quantityFilter(quantity, filteredData);
		filteredData = districtFilter(district, filteredData);
		filteredData = cropFilter(crops, filteredData);
		setCurrentPage(1);
		setFilterData(filteredData);
	}

	function sortData(param = -1){
		setCurrentPage(1);
		param = sortParameters;
		let data = filteredData;
		if(param.bid ==-1 && param.quantity == -1){
			setSortedData(data);
			return;
		}
		if(param.bid != -1){
			let sortedData = _.sortBy(data, ["expectedPrice"]);
			if(param.bid == "dsc"){
				sortedData = _.reverse(sortedData);
			}
			setSortedData(sortedData);
			return;
		}

		if(param.quantity != -1){
			let sortedData = _.sortBy(data, ["quantity"]);
			if(param.quantity == "dsc"){
				sortedData = _.reverse(sortedData);
			}
			setSortedData(sortedData);
			return;
		}
	}

	function sortParams(val){
		setSortParameters(val);
	}

	function handleOnFilterReset(){
		setIsPageChange(!isPageChange);
	}

	function onSearchBarClick(val){
		setSearchTerm(val);
	}

	function searchFilter(data){
		let searchDataArray = data;
		if(searchTerm!=null){
			searchDataArray = searchDataArray.filter((listing)=>{
				let nameMatch = false;
				let stateMatch = false;
				let _searchArray = searchTerm.split(" ");
				const searchArray = _searchArray.filter(el => {
					return el != null && el != "";
				});
				if(searchArray.length>1){
					for (let i = 0; i < searchArray.length; i++) {
						if(searchArray[i]==""){
							continue;
						}
						if(!nameMatch && listing.name.toLowerCase().includes(searchArray[i].toLowerCase())){
							nameMatch = true;
							continue;
						}
						if(!cityMatch && listing.location.state.toLowerCase().includes(searchArray[i].toLowerCase())){
							cityMatch = true;
							continue;
						}
					}
					return (nameMatch && stateMatch);

				}
				else if(searchArray.length==0){
					return true;
				}
				else {
					return (
						listing
							.name
							.toLowerCase()
							.includes(searchArray[0].toLowerCase()) ||
					listing
						.location.state
						.toLowerCase()
						.includes(searchArray[0].toLowerCase())
					);
				}
			});
		}
		setSearchData(searchDataArray);
		setCurrentPage(1);
	}

	function onClearSearchBar(){
		setSearchTerm("");
	}

	function renderMain(){
		if (isLoading){
			return (
				<Grid container item height={500} xs={12}>
					<Grid container xs={12} item direction={"column"} justifyContent={"center"} alignItems={"center"}>
						<Grid item >
							<CircularProgress />
						</Grid>
					</Grid>
				</Grid>
			);
		}

		else if ((rawItemData==null) && isLoading!=true){
			return(
				<Grid item align="center" height={500} xs={12} minHeight={1200}>
					<Typography variant={"h4"}>
						No Items Available
					</Typography>
					<img height={300} src={"https://www.creativefabrica.com/wp-content/uploads/2021/01/04/Mustard-Sad-Vegetable-Cute-Kawaii-Graphics-7557389-1.jpg"}/>
				</Grid>
			);
		}

		else if( isLoading!=true && searchData.length == 0){
			return (
				<Grid item align="center" height={500} xs={12}>
					<Typography variant={"h4"}>
						No Items Available
					</Typography>
					<img height={300} src={"https://www.creativefabrica.com/wp-content/uploads/2021/01/04/Mustard-Sad-Vegetable-Cute-Kawaii-Graphics-7557389-1.jpg"}/>
				</Grid>
			);
		}

		return (
			<Grid container item spacing={3}>
				{pagedData.map((p)=>{
					return(
						<Grid item container key={p._id} xs={12} sm={6} md={6} lg={4} xl={3}>
							<MarketPlacePlaceCard
								itemId={p._id}
								imgSrc={p.images[0].src}
								itemName={p.name}
								expectedPrice={p.expectedPrice}
								quantity={p.quantity}
								state={p.location.state}
								district={p.location.district}
							//	endTime={p.bid_end_time}
								crop={p.crop}
							/>
						</Grid>
					);
				})}
			</Grid>
		);
	}

	return(
		<Grid container data-testid={"Eauctions"} justifyContent={"center"} p={3}>
			<Grid item container maxWidth={1600} justifyContent={"center"} spacing={3}>
				<Grid item container xs={12}>
					<Grid item xs={12}>
						<Typography variant={"h3"}>Marketplace</Typography>
					</Grid>
				</Grid>
				{/* <Grid item container xs={12} md={4} lg={3} mt={1}>
					<Grid container item mt={3} data-testid={"MarketPlaceFilters"}>
						<MarketPlaceFilters
							filterOnchange={onFilterChange}
							rangeQuantity={customQuantityFilter}
							rangeBid={customBidFilter}
							sortParams={sortParams}
							onFilterReset={handleOnFilterReset}
						/>
					</Grid>
				</Grid> */}
				<Grid item container spacing={3} mt={1} mb={5} xs={12} lg={9} md={8} direction={"column"} justifyContent={"flex-start"} alignItems={"stretch"}>
					<Grid item data-testid={"MarketPlaceSearchbar"}>
						<SearchBar
							onSearchIconClick={onSearchBarClick}
							onCloseIconClick={onClearSearchBar}
						/>
					</Grid>
					<Grid container item spacing={3} minHeight={1000}>
						{renderMain()}
					</Grid>
					<Grid item container justifyContent={"center"}>
						<Grid item>
							<CustomPagination
								itemsCount={searchData.length}
								currentPage={currentPage}
								pageSize={pageSize}
								onPageChange={handlePageChange}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default MarketPlace;
