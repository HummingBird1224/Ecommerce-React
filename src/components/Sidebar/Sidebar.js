import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PhoneInTalkOutlinedIcon from "@mui/icons-material/PhoneInTalkOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Divider from "@mui/material/Divider";
import logo from "../../img/logo.png";
import "./sidebar.module.css";
import authService from "../../services/auth.service";
import { useEffect, useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import PropTypes from "prop-types";





const ResponsiveAppBar = (props) => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [isLoading, setLoading] = useState(true);
	const [userType, setUserType] = useState();

	var pages = ["Dashboard",
		// "e-Auctions" ,
		// "MarketPlace"
	];
	var settings = ["sign in", "sign up"];

	useEffect(() => {
		async function checkValidity() {
			authService.isAuthenticated();

		}

		checkValidity();


		setUserType(authService.getCurrentUserType());

		setLoading(false);
		// eslint-disable-next-line react/prop-types
	}, [props.refresh]);

	if (userType === 0) {
		pages = [
			"Dashboard",
			//	"e-Auctions",
			//	"MarketPlace",
			"My Dashboard",
			"Orders",
			"Help Center",
			"Refund Requests"
		];
		settings = ["My Profile", "Logout"];
	} else if (userType === 1) {
		pages = [
			"Dashboard",
			//	"e-Auctions",
			//	"MarketPlace",
			"My Orders"
		];
		settings = ["My Profile", "Logout"];
	} else if (userType === 2) {
		pages = [
			"Dashboard",
			//	"e-Auctions",
			//	"MarketPlace",
			"Manage Producers",
			"Support Management",
			"Agri Data"
		];
		settings = ["My Profile", "Logout"];
	} else if (userType === 3) {
		pages = [
			"Dashboard",
			//	"e-Auctions",
			//	"MarketPlace",
			"Manage Accounts"];
		settings = ["Logout"];
	} else {
		pages = [
			"Dashboard",
		//	"e-Auctions",
		//	"MarketPlace"
		];
		settings = ["sign in", "sign up"];
	}

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = (event) => {
		let value = event.target.name;
		if (value === undefined) {
			value = event.target.innerHTML;
		}
		setAnchorElNav(null);
		if (value === "Help Center") {
			window.location.replace("/producer/helpCenter");
		} else if (value === "My Dashboard") {
			window.location.assign("/producer");
		} else if (value === "Orders") {
			window.location.assign("/producer/orders");
		} else if (value === "Dashboard") {
			window.location.assign("/");
			/* } else if (value === "e-Auctions") {
				window.location.assign("/eauctions");
			} else if (value === "MarketPlace") {
				window.location.assign("/marketplace"); */
		} else if (value === "Refund Requests") {
			window.location.assign("/producer/refund");
		} else if (value === "Manage Producers") {
			window.location.assign("/officer/manageProducers");
		} else if (value === "Support Management") {
			window.location.assign("/officer/supportManagement");
		} else if (value === "Agri Data") {
			window.location.assign("/officer/agriDataManage");
		} else if (value === "Manage Accounts") {
			window.location.assign("/admin/manageAccounts");
		} else if (value === "My Orders") {
			window.location.assign("/buyer/buy-menu");
		}

	};

	const handleCloseUserMenu = async (event) => {
		setAnchorElUser(null);
		if (event.target.innerHTML === "My Profile" && userType === 0) {
			window.location.assign("/producer/myProfile");
		} else if (event.target.innerHTML === "My Profile" && userType === 1) {
			window.location.assign("/buyer/myProfile");
		} else if (event.target.innerHTML === "My Profile" && userType === 2) {
			window.location.assign("/officer/myProfile");
		} else if (event.target.innerHTML === "sign in") {
			window.location.assign("/auth/login");
		} else if (event.target.innerHTML === "sign up") {
			window.location.assign("/auth/signup");
		} else if (event.target.innerHTML === "Logout") {
			await authService.logout();
			// eslint-disable-next-line react/prop-types
			props.setRefresh(!props.refresh);
			window.location.assign("/");
		}
	};

	return (
		<div>
			{isLoading ? (
				<Grid item align="center">
					<CircularProgress />
				</Grid>
			) : (
				<AppBar position="static" style={{ background: "white" }}>
					<Container maxWidth="xl">
						<Toolbar disableGutters>
							<Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
								<img src={logo} alt="logo" width={100} />
							</Box>
							<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
								<div>
									<Typography
										variant="h6"
										noWrap
										component="a"
										href="/"
										sx={{
											mr: 2,
											display: { xs: "none", md: "flex" },
											fontFamily: "Segoe ui,cursive",
											fontWeight: 700,
											color: "black",
											textDecoration: "none",
										}}
									>
										MegaFPO
									</Typography>
									<div style={{ fontSize: 10, color: "green" }}>for FPO, Buyer, Exporter</div>
								</div>
							</Box>

							<Box sx={{ display: { xs: "none", sm: "none", md: "none", lg: "flex", marginTop: "8px", marginBottom: "8px" } }}>
								<div style={{ display: "flex", marginTop: "8px" }}>
									<div style={{ marginRight: "10px" }}>
										<PhoneInTalkOutlinedIcon style={{ fontSize: "37px", color: "green" }} />
									</div>
									<div style={{ fontFamily: "Roboto,sans-serif", fontSize: 16, color: "black", fontWeight: 600 }}>
										Help Line
										<div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: 14, color: "grey", fontWeight: 500, marginTop: "5px" }}>
											+918090105010
										</div>
									</div>
								</div>
								<Divider orientation="vertical" flexItem sx={{ margin: "4px", marginLeft: "8px" }} />

								<div style={{ display: "flex", marginLeft: "30px", marginTop: "8px" }}>
									<div style={{ marginRight: "10px" }}>
										<MailOutlineIcon style={{ fontSize: "37px", color: "green" }} />
									</div>
									<div style={{ fontFamily: "Roboto,sans-serif", fontSize: 16, color: "black", fontWeight: 600 }}>
										Email
										<div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: 14, color: "grey", fontWeight: 500, marginTop: "5px" }}>
											help@megafpo.com
										</div>
									</div>
								</div>
								<Divider orientation="vertical" flexItem sx={{ margin: "4px", marginLeft: "8px" }} />

								<div style={{ display: "flex", marginLeft: "30px" }}>
									<div style={{ marginRight: "10px", marginTop: "8px" }}>
										<LocationOnOutlinedIcon style={{ fontSize: "37px", color: "green" }} />
									</div>
									<div style={{ fontFamily: "Roboto,sans-serif", fontSize: 16, color: "black", fontWeight: 600 }}>
										Office Address
										<div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: 14, color: "grey", fontWeight: 500, marginTop: "5px" }}>
										MegaFPO, Booth No.2, Kisan Bazar

										</div>
										<div style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: 14, color: "grey", fontWeight: 500, marginTop: "2px" }}>
										Sector 20, Panchkula (Haryana) IN
										</div>
									</div>
								</div>
							</Box>

							<Box sx={{ display: { xs: "flex", md: "none" } }}>
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleOpenNavMenu}
									color="inherit"
								>
									<MenuIcon />
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorElNav}
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "left",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "left",
									}}
									open={Boolean(anchorElNav)}
									onClose={handleCloseNavMenu}
									sx={{
										display: { xs: "block", md: "none" },
									}}
								>
									{pages.map((page) => (
										<MenuItem key={page} id={page} name={page} onClick={handleCloseNavMenu}>
											<Typography textAlign="center">{page}</Typography>
										</MenuItem>
									))}
								</Menu>
							</Box>
							<div style={{ justifyContent: "space-between", display: "flex", flexGrow: 1 }}>
								<div style={{ display: "flex", flexGrow: 1, marginLeft: "25%" }} >
									<div>
										<Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
											<img src={logo} alt="logo" width={100} />
										</Box>
									</div>
									<div>
										<Box sx={{ display: { sm: "flex", xs: "none", md: "none" } }}>
											<div>
												<Typography
													variant="h6"
													noWrap
													component="a"
													href="/"
													sx={{
														mr: 2,
														display: { xs: "flex", md: "none" },
														fontFamily: "Segoe ui",
														fontWeight: 700,
														color: "black",
														textDecoration: "none",
													}}
												>
													MegaFPO
												</Typography>
												<div style={{ fontSize: 10, color: "green" }}>for FPO, Buyer, Exporter</div>
											</div>
										</Box>
									</div>
								</div>

								<div>
									<Box sx={{ marginTop: { lg: "4px", md: "8px", sm: "8px", xs: "8px" } }}>
										<Tooltip title="Open settings">
											<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
												<Avatar alt={authService.getCurrentUserName()} src={authService.getCurrentUserDP()} />
											</IconButton>
										</Tooltip>
										<Menu
											sx={{ mt: "45px" }}
											id="menu-appbar"
											anchorEl={anchorElUser}
											anchorOrigin={{
												vertical: "top",
												horizontal: "right",
											}}
											keepMounted
											transformOrigin={{
												vertical: "top",
												horizontal: "right",
											}}
											open={Boolean(anchorElUser)}
											onClose={handleCloseUserMenu}
										>
											{settings.map((setting) => (
												<MenuItem key={setting} onClick={handleCloseUserMenu}>
													<Typography textAlign="center">{setting}</Typography>
												</MenuItem>
											))}
										</Menu>
									</Box>
								</div>
							</div>
						</Toolbar>
					</Container>
					<Box className="click" sx={{ display: { xs: "none", md: "flex" }, backgroundColor: "green", justifyContent: "space-around" }}>
						{pages.map((page) => (
							<Button
								key={page}
								id={page}
								name={page}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: "white", display: "block", fontWeight: 500, margin: "3px" }}
							>
								{page}
							</Button>

						))}
					</Box>
				</AppBar>
			)}
		</div>

	);
};

ResponsiveAppBar.propTypes = {
	refresh: PropTypes.bool
};

export default ResponsiveAppBar;
