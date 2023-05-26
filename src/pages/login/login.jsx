import React, { useState} from "react";
import {Alert, Grid} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Copyright from "../../components/copyright/copyright";
import authService from "../../services/auth.service";
import ForgetPassword from "./forgetPassword";


function Login() {

	const [username,setUsername] = useState();
	const [password,setPassword] = useState();
	const [error,setError] = useState();
	const [hiddenError,setHiddenError] = useState(true);



	function validateNonEmpty(text){
		return text !== undefined && text !== "";
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (validateNonEmpty(username) && validateNonEmpty(password)) {
			try{
				const res = await authService.login(username, password);
				if(res.success === false){
					setError(res.msg);
					setHiddenError(false);
					return;
				}
				// eslint-disable-next-line react/prop-types
				setHiddenError(true);
				window.location.assign("/");
			}catch (e){
				setError("Login Fail! check your username and password!");
				setHiddenError(false);
			}

		} else {
			setError("Username or password can not be empty!");
			setHiddenError(false);
		}


	};

	const handleChange = (event) => {
		if(event.target.id === "username"){
			setUsername(event.target.value);
		}else if(event.target.id === "password"){
			setPassword(event.target.value);
		}

		setHiddenError(true);
	};

	return (

		<Grid container component="main" sx={{ height: "100vh" }}>
			<CssBaseline />
			<Grid
				item
				xs={false}
				sm={4}
				md={7}
				sx={{
					backgroundImage: "url(https://images-na.ssl-images-amazon.com/images/S/pv-target-images/3f1e848a6d653ec47cfb06545fbb1c82b54aa1cc73c34989e5b0e95f361fdd5d._RI_V_TTW_.jpg)",
					backgroundRepeat: "no-repeat",
					backgroundColor: (t) =>
						t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			/>
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div hidden={hiddenError}>
					<Alert severity="error">{error}</Alert>
				</div>
				<Box
					sx={{
						my: 8,
						mx: 4,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
							Sign in
					</Typography>
					<Box component="form" noValidate onChange={handleChange} onSubmit={handleSubmit} sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="username"
							label="Username"
							name="username"
							autoComplete="username"
							value={username}
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							value={password}
							autoComplete="current-password"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
								Sign In
						</Button>
						<Grid container>
							<Grid item xs hidden={true}>
								<ForgetPassword />
							</Grid>
							<Grid item>
								<Link href="/auth/signup" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
						<Copyright sx={{ mt: 5 }} />
					</Box>
				</Box>
			</Grid>
		</Grid>
	);
}

export default Login;
