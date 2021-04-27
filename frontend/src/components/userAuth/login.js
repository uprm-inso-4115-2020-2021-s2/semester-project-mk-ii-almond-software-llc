import React, { useState, useEffect } from "react";
import Pistachio from "./pistachio.png";
import {
	makeStyles,
	Button,
	CssBaseline,
	TextField,
	Link,
	Grid,
	Typography,
	Container,
} from "@material-ui/core";
import { BrowserRouter as useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	image: {
		width: 60,
		height: 60,
		backgroundColor: "green",
		borderRadius: "50%",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: "green",
		"&:hover": {
			backgroundColor: "darkgreen",
		},
	},
	loginButton: {
		textDecoration: "none",
		color: "white",
		fontFamily: "Roboto",
		"&:hover": {
			color: "white",
			textDecoration: "none",
		},
	},
}));

export default function Login() {
	const classes = useStyles();
	let history = useHistory();
	let [user, setUser] = useState(null);
	let [password, setPassword] = useState(null);
	let [validLogin, setValidLogin] = useState(true);
	let [errorMessage, setErrorMessage] = useState("");

	const verifyLogin = async () => {
		await axios
			.get("http://localhost:8080/api/player/getUser?user=" + user)
			.then((res) => {
				setValidLogin(res.data !== "");
				if (res.data !== "") {
					setValidLogin(res.data.pass === password);
					if (res.data.pass === password) {
						Cookies.set("user", res.data.user);
						// Cookies.set("matched". false);
						Cookies.remove("loggedIn");
						history.push("/main");
					} else {
						setErrorMessage("Password is invalid");
					}
				} else {
					setErrorMessage("Username not found");
				}
			});
	};

	function fetchData() {
		if (Cookies.get("user") !== undefined) {
			if (Cookies.get("user") !== "") {
				history.push("/main");
			}
		}
	}

	useEffect(() => {
		fetchData();
	}, [history]);

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<img src={Pistachio} className={classes.image} alt="Pistachio logo" />
				<Typography component="h1" variant="h5">
					Login
				</Typography>
				<TextField
					variant="outlined"
					required
					fullWidth
					id="user"
					label="Username"
					name="user"
					autoComplete="user"
					onChange={(e) => setUser(e.target.value)}
				/>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					autoComplete="current-password"
					error={!validLogin}
					helperText={validLogin ? "" : errorMessage}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					onClick={() => {
						verifyLogin();
					}}
				>
					<Typography>Login</Typography>
				</Button>
				<Grid container>
					<Grid item xs></Grid>
					<Grid item>
						<Link href="/signup">{"Don't have an account? Click here!"}</Link>
					</Grid>
				</Grid>
			</div>
		</Container>
	);
}
