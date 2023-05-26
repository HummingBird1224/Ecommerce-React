import React from "react";
import { Divider, Grid, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import PropTypes from "prop-types";


function ProfileView(props){

	const userType = ["Producer","Buyer","Officer"];
	return(
		<Container>
			<Grid container spacing={2}>
				<Grid item xs={12} mt={2} align="center">
					<Paper elevation={3} >
						<Grid item xs={12}>
							<Avatar
								alt="Profile picture"
								src={props.image}
								sx={{ width: 150, height: 150 }}
							/>
						</Grid>
						<Grid item xs={12}>
							<Paper elevation={2} >
								{/* eslint-disable-next-line react/prop-types */}
								<Typography mt={2}>{props.userName}</Typography>
								{/* eslint-disable-next-line react/prop-types */}
								<Typography mt={2}>{userType[props.userType]}</Typography>
							</Paper>
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={12} mt={2}>
					<Paper elevation={3}>
						<List sx={{ width: "100%", bgcolor: "background.paper"}}>
							<ListItem alignItems="flex-start">
								<ListItemAvatar>
									<DnsRoundedIcon />
								</ListItemAvatar>
								<ListItemText
									primary="First Name"
									secondary={
										<React.Fragment>
											{/* eslint-disable-next-line react/prop-types */}
											{props.firstName}
										</React.Fragment>
									}
								/>
							</ListItem>

							<Divider variant="inset" component="li" />

							<ListItem alignItems="flex-start">
								<ListItemAvatar>
									<DnsRoundedIcon />
								</ListItemAvatar>
								<ListItemText
									primary="Last Name"
									secondary={
										<React.Fragment>
											{/* eslint-disable-next-line react/prop-types */}
											{props.lastName}
										</React.Fragment>
									}
								/>
							</ListItem>

							<Divider variant="inset" component="li" />

							<Grid item hidden={!props.showSecrets}>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<BadgeRoundedIcon />
									</ListItemAvatar>
									<ListItemText
										primary="NIC"
										secondary={
											<React.Fragment>
												{/* eslint-disable-next-line react/prop-types */}
												{props.nic}
											</React.Fragment>
										}
									/>
								</ListItem>

								<Divider variant="inset" component="li" />
							</Grid>

							<ListItem alignItems="flex-start">
								<ListItemAvatar>
									<MailRoundedIcon />
								</ListItemAvatar>
								<ListItemText
									primary="Email Address"
									secondary={
										<React.Fragment>
											{/* eslint-disable-next-line react/prop-types */}
											{props.email}
										</React.Fragment>
									}
								/>
							</ListItem>

							<Divider variant="inset" component="li" />
							<div hidden={props.userType === 2}>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<PhoneRoundedIcon />
									</ListItemAvatar>
									<ListItemText
										primary="Telephone Number"
										secondary={
											<React.Fragment>
												{/* eslint-disable-next-line react/prop-types */}
												{props.telephoneNumber}
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
							</div>

							<div hidden={props.userType === 2}>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<HomeRoundedIcon />
									</ListItemAvatar>
									<ListItemText
										primary="Postal Address"
										secondary={
											<React.Fragment>
												{/* eslint-disable-next-line react/prop-types */}
												{props.address}
											</React.Fragment>
										}
									/>
								</ListItem>
							</div>


							{/* eslint-disable-next-line react/prop-types */}
							<div hidden={props.userType === 1}>
								<Divider variant="inset" component="li" />
								{/* eslint-disable-next-line react/prop-types */}
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<ShareLocationIcon />
									</ListItemAvatar>
									<ListItemText
										primary="State"
										secondary={
											<React.Fragment>
												{/* eslint-disable-next-line react/prop-types */}
												{props.state}
											</React.Fragment>
										}
									/>
								</ListItem>
							</div>


							{/* eslint-disable-next-line react/prop-types */}
							<div hidden={!(props.userType === 0)}>
								<Divider variant="inset" component="li" />
								{/* eslint-disable-next-line react/prop-types */}
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<ShareLocationIcon />
									</ListItemAvatar>
									<ListItemText
										primary="District"
										secondary={
											<React.Fragment>
												{/* eslint-disable-next-line react/prop-types */}
												{props.district}
											</React.Fragment>
										}
									/>
								</ListItem>
							</div>

						</List>
					</Paper>

				</Grid>
			</Grid>
		</Container>

	);

}

ProfileView.propTypes = {
	showSecrets: PropTypes.bool,
	image: PropTypes.string,
	userType: PropTypes.number
};

export default ProfileView;