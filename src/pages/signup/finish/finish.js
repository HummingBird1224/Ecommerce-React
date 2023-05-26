import React from "react";
import ProfileView from "../../profile/profileView/profileView";
import { Alert } from "@mui/material";

function Finish(props) {

	return (
		<div>
			{/* eslint-disable-next-line react/prop-types */}
			<div hidden={!props.success}>
				{/* eslint-disable-next-line react/prop-types */}
				{props.userType === 0 ? (
					<Alert severity="success">Your request is recorded. Our officers will review and accept your account</Alert>
				) : (
					<Alert severity="success">Account create successfully!</Alert>
				)}
			</div>

			{/* eslint-disable-next-line react/prop-types */}
			<div hidden={!props.fail}>
				<Alert severity="error">Something went wrong! Try again or contact an officer</Alert>
			</div>

			{/* eslint-disable-next-line react/prop-types */}
			<ProfileView
				image={"https://res.cloudinary.com/djzmh3ny5/image/upload/v1675484271/profile_picture_dtlmvp.jpg"}
				firstName={props.firstName}
				lastName={props.lastName}
				email={props.email}
				nic={props.nic}
				address={props.address}
				telephoneNumber={props.telephoneNumber}
				state={props.state}
				district={props.district}
				userType={props.userType} />
		</div>

	);
}

export default Finish;