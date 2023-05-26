import React, { useEffect, useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, FormGroup, FormLabel, Grid, Typography, CircularProgress } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import _ from "lodash";
import PropTypes from "prop-types";
import TextInput from "../../components/textInput/textInput";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { getCropTypes } from "../../services/croptypeServices";

function MarketPlaceFilters(props) {
	// WIP Fetch from DB
	const districts = [
		"Ampara",
		"Anuradhapura",
		"Badulla",
		"Batticaloa",
		"Colombo",
		"Galle",
		"Gampaha",
		"Hambantota",
		"Jaffna",
		"Kalutara",
		"Kandy",
		"Kegalle",
		"Kilinochchi",
		"Kurunegala",
		"Mannar",
		"Matale",
		"Matara",
		"Moneragala",
		"Mullaitivu",
		"Nuwara Eliya",
		"Polonnaruwa",
		"Puttalam",
		"Ratnapura",
		"Trincomalee",
		"Vavuniya"];
	const crops = [
		"Carrot",
		"Ginger",
		"Garlic",
		"Onions",
		"Pineapple",
		"Beans",
		"Peas",
		"Beet",
		"Corn",
		"Leaks",
		"Eggplant",
		"Potato",
		"Pumpkin",
		"Tomato",
		"Watermelon",
		"Papaya",
		"Radish",
		"Mango",
		"Cabbage",
		"Avacado",
		"Banana",
		"Rice"];
	let cropsSet = new Set(crops);
	let districtSet = new Set(districts);

	const [checked, setChecked1] = useState([true, true]);
	const [checked2, setChecked2] = useState([true, true]);
	const [districtTickState, districtSetTickState] = useState(districtSet);
	const [cropTickState, cropSetTickState] = useState(cropsSet);

	const [cropNames, setCropNames] = useState([])
	const [expectedPrice, setExpectedPrice] = useState("0");
	const [quantity, setQuantity] = useState("0");
	const [change, setChange] = useState(false);
	const [isCustomBidRange, setIsCustomBidRange] = useState(false);
	const [isCustomQuantityRange, setIsCustomQuantityRange] = useState(false);
	const [customBidRange, setCustomBidRange] = useState(["", ""]);
	const [customQuantityRange, setCustomQuantityRange] = useState(["", ""]);
	const [customFilterWarning, setCustomFilterWarning] = useState([false, false]);

	const [sortBidState, setSortBidState] = useState(-1);
	const [sortQuantityState, setSortQuantityState] = useState(-1);
	const [sortParams, setSortParams] = useState({ bid: -1, quantity: -1 });
	const [isResetButton, setResetButton] = useState(false);
	const [loading, setLoading] = useState(true)
	/* 	useEffect(() => {
			async function fetchData() {
				const { data } = await getCropTypes();
				const cropName = data.map((c) => {
					return c.name
				})
				console.log(cropName);
			}
			fetchData();
		}, []); */


	useEffect(() => {
		async function fetchData() {
			const { data } = await getCropTypes();
			const cropNameData = data.map((c) => {
				return c.name
			})
			console.log(cropNameData)
			setCropNames(cropNameData);
			cropSetTickState(cropNameData)
			setLoading(false)
		}
		fetchData();
		let data = {
			expectedPrice: expectedPrice,
			quantity: quantity,
			district: districtTickState,
			crops: cropTickState
		};
		props.filterOnchange(data);
	}, [change]);

	useEffect(() => {
		props.sortParams(sortParams);
	}, [sortParams]);

	const handleChange1 = (event) => {
		let currentCheckedState = event.target.checked;
		if (currentCheckedState) {
			districtSetTickState(districtSet);
		} else {
			districtSetTickState(new Set());
		}
		setChecked1([event.target.checked, event.target.checked]);
		setChange(!change);
	};
	const handleChange2 = (event) => {
		let currentCheckedState = event.target.checked;
		if (currentCheckedState) {
			cropSetTickState(cropsSet);
		} else {
			cropSetTickState(new Set());
		}
		setChecked2([event.target.checked, event.target.checked]);
		setChange(!change);
		setResetButton(true);
	};

	const childHandle1 = (event) => {
		let currentTick = event.target.id;
		let currentTickState = event.target.checked;
		let curentI = districtTickState;
		if (currentTickState) {
			curentI.add(currentTick);
		} else {
			curentI.delete(currentTick);
		}
		districtSetTickState(curentI);
		if (_.isEqual(curentI, districtSet)) {
			setChecked1([true, true]);
		} else if (curentI.size == 0) {
			setChecked1([false, false]);
		} else {

			setChecked1([false, true]);
		}
		setChange(!change);
		setResetButton(true);
	};
	const childHandle2 = (event) => {
		let currentTick = event.target.id;
		let currentTickState = event.target.checked;
		let curentI = cropTickState;
		if (currentTickState) {
			curentI.add(currentTick);
		} else {
			curentI.delete(currentTick);
		}
		cropSetTickState(curentI);
		if (_.isEqual(curentI, cropsSet)) {
			setChecked2([true, true]);
		} else if (curentI.size == 0) {
			setChecked2([false, false]);
		} else {

			setChecked2([false, true]);
		}
		setChange(!change);
		setResetButton(true);
	};

	const handleBid = (event) => {
		if (event.target.value == "5") {
			setIsCustomBidRange(true);
		} else {
			setIsCustomBidRange(false);
		}
		setExpectedPrice(event.target.value);
		setChange(!change);
		setResetButton(true);
	};

	const handleQuantity = (event) => {
		if (event.target.value == "5") {
			setIsCustomQuantityRange(true);
		} else {
			setIsCustomQuantityRange(false);
		}
		setQuantity(event.target.value);
		setChange(!change);
		setResetButton(true);
	};

	const handleBidMin = (event) => {
		const value = event.target.value;
		if (value >= 0 && value <= 1000000000000) {
			setCustomBidRange([value, customBidRange[1]]);
			setResetButton(true);
		}
	};
	const handleBidMax = (event) => {
		const value = event.target.value;
		if (value >= 0 && value <= 1000000000000) {
			setCustomBidRange([customBidRange[0], value]);
			setResetButton(true);
		}
	};
	const handleQuantityMin = (event) => {
		const value = event.target.value;
		if (value >= 0 && value <= 1000000000000) {
			setCustomQuantityRange([value, customQuantityRange[1]]);
			setResetButton(true);
		}
	};
	const handleQuantityMax = (event) => {
		const value = event.target.value;
		if (value >= 0 && value <= 1000000000000) {
			setCustomQuantityRange([customQuantityRange[0], value]);
			setResetButton(true);
		}
	};
	const handleBidRangeSubmit = () => {
		if (+customBidRange[0] > +customBidRange[1] || customBidRange[0] == "" || customBidRange[1] == "") {
			setCustomFilterWarning([true, customFilterWarning[1]]);
			setCustomBidRange(["", ""]);
		}
		else {
			setCustomFilterWarning([false, customFilterWarning[1]]);
			props.rangeBid(customBidRange);
			setChange(!change);
			setResetButton(true);
		}
	};

	const handleQuantityRangeSubmit = () => {
		if (+customQuantityRange[0] > +customQuantityRange[1] || customQuantityRange[0] == "" || customQuantityRange[1] == "") {
			setCustomFilterWarning([customFilterWarning[0], true]);
			setCustomQuantityRange(["", ""]);
		}
		else {
			setCustomFilterWarning([customFilterWarning[0], false]);
			props.rangeQuantity(customQuantityRange);
			setChange(!change);
			setResetButton(true);
		}
	};

	const handleSortBidState = (event) => {
		const value = event.target.value;
		setSortQuantityState(-1);
		setSortBidState(value);
		setSortParams({ bid: value, quantity: -1 });
		setResetButton(true);
	};

	const handleSortQuantityState = (event) => {
		const value = event.target.value;
		setSortBidState(-1);
		setSortQuantityState(value);
		setSortParams({ bid: -1, quantity: value });
		setResetButton(true);
	};

	const handleOnPageReset = () => {
		setChecked1([true, true]);
		setChecked2([true, true]);
		districtSetTickState(districtSet);
		cropSetTickState(cropsSet);
		setExpectedPrice("0");
		setQuantity("0");
		setChange(false);
		setIsCustomBidRange(false);
		setIsCustomQuantityRange(false);
		setCustomBidRange(["", ""]);
		setCustomQuantityRange(["", ""]);
		setCustomFilterWarning([false, false]);

		setSortBidState(-1);
		setSortQuantityState(-1);
		setSortParams({ bid: -1, quantity: -1 });
		props.onFilterReset();
		setResetButton(false);
	};

	const resetButton = () => {
		if (isResetButton) {
			return (
				<Grid item container>

					<Grid item xs={6}>
						<Typography variant={"h5"} align={"center"}>Filters</Typography>
					</Grid>
					<Grid item xs={6} align={"center"}>
						<Button color={"warning"} variant={"contained"} sx={
							{
								color: "white",
								borderRadius: "100px"
							}
						}
							onClick={handleOnPageReset}>Reset</Button>
					</Grid>
				</Grid>

			);
		}
		return (
			<Grid item xs={12}>
				<Typography variant={"h5"} align={"center"}>Filters</Typography>
			</Grid>
		);
	};

	const districtChildren = (
		<Grid mr={1}>
			<Box sx={{ display: "flex", flexDirection: "column", ml: 3, overflow: "auto", maxHeight: 200, width: 1 }}>
				<FormGroup >
					{districts.map((e) => {
						return (
							<FormControlLabel
								key={e}
								label={e}
								control={
									<Checkbox
										checked={districtTickState.has(e)}
										onChange={childHandle1}
										id={e} />
								}
							/>
						);
					})}
				</FormGroup>
			</Box>
		</Grid>
	);

	const cropChildren = (
		<Grid mr={1}>
			<Box sx={{ display: "flex", flexDirection: "column", ml: 3, overflow: "auto", maxHeight: 200, width: 1 }}>
				<FormGroup >
					{cropNames?.map((e) => {
						return (
							<FormControlLabel
								key={e}
								label={e}
								control={
									<Checkbox
										checked={cropNames?.has(e)}
										onChange={childHandle2}
										id={e} />
								}
							/>
						);
					})}
				</FormGroup>
			</Box>
		</Grid>
	);
	if (!loading) {
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
	else
		return (

			<Grid item xs={12}>
				{/*<Paper elevation={2} sx={{borderRadius: "10px"}}>*/}
				<Grid container mt={2}>
					<Grid container item xs={12} mb={3}>
						{resetButton()}
					</Grid>
					<Grid item xs={12}>
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography variant={"h6"} align={"center"}>Minimum Bid</Typography>
							</AccordionSummary>
							<AccordionDetails>

								<FormControl>
									<FormLabel id="demo-row-radio-buttons-group-label">Sort</FormLabel>
									<RadioGroup
										row
										aria-labelledby="demo-row-radio-buttons-group-label"
										name="row-radio-buttons-group"
										value={sortBidState}
										onChange={handleSortBidState}
									>
										<FormControlLabel value="asc" control={<Radio />} label="Ascending" />
										<FormControlLabel value="dsc" control={<Radio />} label="Descending" />
									</RadioGroup>
								</FormControl>

								<FormControl>
									<FormLabel id="demo-row-radio-buttons-group-label">Filter</FormLabel>
									<RadioGroup
										aria-labelledby="demo-radio-buttons-group-label"
										defaultValue="0"
										name="radio-buttons-group"
										value={expectedPrice}
										onChange={handleBid}
									>
										<FormControlLabel value="0" control={<Radio />} label="Any Price" />
										<FormControlLabel value="1" control={<Radio />} label="Less than LKR 100,000" />
										<FormControlLabel value="2" control={<Radio />} label="LKR 100,000 - 1,000,000" />
										<FormControlLabel value="3" control={<Radio />} label="LKR 1,000,000 - 10,000,000" />
										<FormControlLabel value="4" control={<Radio />} label="More than LKR 10,000,000" />
										<FormControlLabel value="5" control={<Radio />} label="Custom" />
									</RadioGroup>
									{isCustomBidRange ? (
										<Grid container spacing={2} alignItems={"center"}>
											<Grid item xs={4}>
												<TextInput name={"min"} type={"number"} label={"min"} onChange={handleBidMin} value={customBidRange[0]} />
											</Grid>
											<Grid item xs={4}>
												<TextInput name={"max"} type={"number"} label={"max"} onChange={handleBidMax} value={customBidRange[1]} />
											</Grid>
											<Grid item xs={4} >
												<Button color={customFilterWarning[0] == true ? "warning" : "primary"} variant={"contained"} sx={
													{
														color: "white",
														borderRadius: "100px"
													}
												}
													onClick={handleBidRangeSubmit}
												>Filter</Button>
											</Grid>
										</Grid>
									) : ""}
								</FormControl>
							</AccordionDetails>
						</Accordion>
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography variant={"h6"} align={"center"}>Quantity</Typography>
							</AccordionSummary>
							<AccordionDetails>

								<FormControl>
									<FormLabel id="demo-row-radio-buttons-group-label">Sort</FormLabel>
									<RadioGroup
										row
										aria-labelledby="demo-row-radio-buttons-group-label"
										name="row-radio-buttons-group"
										value={sortQuantityState}
										onChange={handleSortQuantityState}
									>
										<FormControlLabel value="asc" control={<Radio />} label="Ascending" />
										<FormControlLabel value="dsc" control={<Radio />} label="Descending" />
									</RadioGroup>
								</FormControl>

								<FormControl>
									<FormLabel id="demo-row-radio-buttons-group-label">Filter</FormLabel>
									<RadioGroup
										aria-labelledby="demo-radio-buttons-group-label"
										defaultValue="0"
										name="radio-buttons-group"
										value={quantity}
										onChange={handleQuantity}
									>
										<FormControlLabel value="0" control={<Radio />} label="Any Quantity" />
										<FormControlLabel value="1" control={<Radio />} label="Less than 100kg" />
										<FormControlLabel value="2" control={<Radio />} label="100 - 1,000 kg" />
										<FormControlLabel value="3" control={<Radio />} label="1,000 - 10,000 kg" />
										<FormControlLabel value="4" control={<Radio />} label="More than 10,000 kg" />
										<FormControlLabel value="5" control={<Radio />} label="Custom" />
									</RadioGroup>
									{isCustomQuantityRange ? (
										<Grid container spacing={2} alignItems={"center"}>
											<Grid item xs={4}>
												{/*<TextInput name={"min"} type={"number"} label={"min"} onChange={handleQuantityMin} value={customQuantityRange[0]}/>*/}
												<TextField name={"min"} type={"number"} label={"min"} onChange={handleQuantityMin} value={customQuantityRange[0]} />
											</Grid>
											<Grid item xs={4}>
												{/*<TextInput name={"max"} type={"number"} label={"max"} onChange={handleQuantityMax} value={customQuantityRange[1]}/>*/}
												<TextField name={"max"} type={"number"} label={"max"} onChange={handleQuantityMax} value={customQuantityRange[1]} />
											</Grid>
											<Grid item xs={4} >
												<Button color={customFilterWarning[1] == true ? "warning" : "primary"} variant={"contained"} sx={
													{
														color: "white",
														borderRadius: "100px"
													}
												}
													onClick={handleQuantityRangeSubmit}
												>Filter</Button>
											</Grid>
										</Grid>
									) : ""}
								</FormControl>
							</AccordionDetails>
						</Accordion>
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography variant={"h6"} align={"center"}>District</Typography>
							</AccordionSummary>
							<AccordionDetails style={
								{ marginBottom: "20px", borderTop: "solid", borderWidth: "1px", borderTopColor: "#eeeeee" }
							}>
								<FormControl style={{ width: "100%" }}>
									<FormControlLabel
										label="All Districts"
										control={
											<Checkbox
												checked={checked[0] && checked[1]}
												indeterminate={checked[0] !== checked[1]}
												onChange={handleChange1}
											/>
										}
									/>
									{districtChildren}
								</FormControl>
							</AccordionDetails>
						</Accordion>
						<Accordion>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography variant={"h6"} align={"center"}>Top Crop Catergories</Typography>
							</AccordionSummary>
							<AccordionDetails style={
								{ marginBottom: "20px", borderTop: "solid", borderWidth: "1px", borderTopColor: "#eeeeee" }
							}>
								<FormControl style={{ width: "100%" }}>
									<FormControlLabel
										label="All Crops"
										control={
											<Checkbox
												checked={checked2[0] && checked2[1]}
												indeterminate={checked2[0] !== checked2[1]}
												onChange={handleChange2}
											/>
										}
									/>
									{cropChildren}
								</FormControl>
							</AccordionDetails>
						</Accordion>
					</Grid>
				</Grid>
				{/*</Paper>*/}
			</Grid>

		);
}

MarketPlaceFilters.propTypes = {
	filterOnchange: PropTypes.func.isRequired,
	rangeBid: PropTypes.func.isRequired,
	rangeQuantity: PropTypes.func.isRequired,
	sortParams: PropTypes.func.isRequired,
	onFilterReset: PropTypes.func.isRequired
};

export default MarketPlaceFilters;
