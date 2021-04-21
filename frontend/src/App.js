import "./App.css";
import React, { Component, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssignmentIcon from "@material-ui/icons/Assignment";
import HomeIcon from "@material-ui/icons/Home";
import SportsKabaddiIcon from "@material-ui/icons/SportsKabaddi";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import PeopleIcon from "@material-ui/icons/People";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./components/tabs/tabPanel";
import a11yProps from "./components/tabs/a11yProps";
import Social from "./components/social/social";
import Main from "./components/main/main";
import Battle from "./components/battle/battle";
import Loot from "./components/loot/loot";
import { Typography, Grid } from "@material-ui/core";
import useWindowDimensions from "./components/windowDimensions/useWindowDimensions";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import CachedIcon from "@material-ui/icons/Cached";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	rectangle: {
		width: "100%",
		top: "auto",
		bottom: 0,
		position: "fixed",
	},
	taskButton: {
		marginRight: theme.spacing(2),
	},
	logoutButton: {
		marginLeft: theme.spacing(2),
	},
	appBar: {
		top: "auto",
		bottom: 0,
	},
	names: {
		// borderStyle: "solid",
	},
	monsterNames: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: "green",
		"&:hover": {
			backgroundColor: "darkgreen",
		},
		changeTeamButton: {
			backgroundColor: "green",
		},
	},
	// icon: {
	//   position: "absolute",
	//   color: "black",
	//   fontSize: "2rem",
	//   marginTop: "-2rem",
	//   border: "solid black",
	//   borderRadius: "2rem",
	//   marginLeft:"76rem"
	// },
}));

export default function App() {
	const classes = useStyles();
	const { height, width } = useWindowDimensions();
	const [matched, setMatched] = useState(false);
	const [appHeight, setAppHeight] = useState(height);
	const [value, setValue] = useState(0);
	let history = useHistory();
	const [playerTeam, setPlayerTeam] = useState([]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const logoutUser = () => {
		Cookies.set("user", "");
		history.push("/");
	};

	const getPlayerTeam = async () => {
		await axios
			.get(
				"http://localhost:8080/api/player/getPlayerTeam/" + Cookies.get("user")
			)
			.then((res) => {
				setPlayerTeam(res.data);
			});
	};

	useEffect(() => {
		getPlayerTeam();
	}, []);

	return (
		<div className="App">
			<div
				className={classes.root}
				ref={(e) => {
					if (!e) return;
					setAppHeight(height - e.getBoundingClientRect().height);
					console.log(appHeight);
				}}
			>
				<AppBar
					position="static"
					elevation={3}
					style={{ backgroundColor: "green" }}
				>
					<Toolbar variant="dense" style={{ justifyContent: "center" }}>
						{/* <IconButton
              edge="start"
              className={classes.taskButton}
              color="inherit"
              aria-label="menu"
            >
              <AssignmentIcon fontSize="small" />
            </IconButton> */}
						<Tabs value={value} onChange={handleChange}>
							<Tab
								icon={<PeopleIcon fontSize="small" />}
								label="Social"
								disabled={matched}
								{...a11yProps(0)}
							/>
							<Tab
								icon={<HomeIcon fontSize="small" />}
								label="Main"
								disabled={matched}
								{...a11yProps(1)}
							/>
							<Tab
								icon={<SportsKabaddiIcon fontSize="small" />}
								label="Battle"
								disabled={matched}
								{...a11yProps(2)}
							/>
							<Tab
								icon={<LocalMallIcon fontSize="small" />}
								label="Loot"
								disabled={matched}
								{...a11yProps(3)}
							/>
						</Tabs>
						<IconButton
							edge="end"
							className={classes.logoutButton}
							color="inherit"
							aria-label="menu"
							onClick={() => {
								logoutUser();
							}}
						>
							<ExitToAppIcon fontSize="small" />
						</IconButton>
					</Toolbar>
				</AppBar>
			</div>

			<div style={{ height: 0.85 * appHeight, overflowY: "scroll" }}>
				<TabPanel value={value} index={0}>
					<Social />
				</TabPanel>

				<TabPanel value={value} index={1}>
					<Main />
				</TabPanel>

				<TabPanel value={value} index={2}>
					<Battle
						appHeight={0.85 * appHeight - 0.15 * appHeight}
						matched={matched}
						setMatched={setMatched}
					/>
				</TabPanel>

				<TabPanel value={value} index={3}>
					<Loot />
				</TabPanel>
			</div>

			<div>
				<AppBar position="fixed" color="primary" className={classes.appBar}>
					<Grid
						container
						alignItems="center"
						justify="center"
						direction="row"
						style={{ height: 0.15 * appHeight, background: "green" }}
					>
						<Grid container item xs={12} spacing={3}>
							{playerTeam.map((e, i) => {
								return (
									<Grid item xs={4} key={i}>
										<AccountCircleRoundedIcon style={{ fontSize: "2.5rem" }} />
										<Typography className={classes.names}>{e}</Typography>
									</Grid>
								);
							})}
							<Grid container alignItem="center" justify="center">
								<Button
									variant="contained"
									className={classes.changeTeamButton}
									size="small"
								>
									Change team
								</Button>
							</Grid>
						</Grid>
						{/* <CachedIcon className={classes.icon}/> */}
					</Grid>
				</AppBar>
			</div>
		</div>
	);
}
