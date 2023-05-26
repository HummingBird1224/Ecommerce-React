import React, {useState} from "react";
import AppRouter from "./router";
import "./App.css";
import theme from "./components/theme/theme";
import {Grid, ThemeProvider} from "@mui/material";
import Footer from "./components/footer/footer";
import Sidebar from "./components/Sidebar/Sidebar";
import NewFooter from "./components/NewFooter/NewFooter";
function App() {

	const [refresh,setRefresh] = useState(false);


	return (

		<ThemeProvider theme={theme}>
			<div className="App" >
				<Grid container spacing={2} data-testid={"App"}>
					<Grid item xs={12} data-testid={"Sidebar"}>
						<Sidebar refresh={refresh} setRefresh={setRefresh} />
					</Grid>
					<Grid item xs={12} data-testid={"Router"}>
						<AppRouter refresh={refresh} setRefresh={setRefresh} />
					</Grid>
					<Grid item xs={12}>
						<NewFooter/>
					{/* 	<Footer /> */}
					</Grid>
				</Grid>



			</div>
		</ThemeProvider>
	);
}

export default App;
