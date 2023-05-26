import {createTheme} from "@mui/material/styles";

let theme = createTheme({
	palette: {
		type: "light",
		primary: {
			main: "#3fb559",
		},
		secondary: {
			main: "#f50057",
		},

		info: {
			main: "#004ef5",
		},
	},
});

// theme = createTheme(theme, {
// 	palette: {
// 		info: {
// 			main: theme.palette.secondary.main,
// 		},
// 	},
// });

export default theme;

