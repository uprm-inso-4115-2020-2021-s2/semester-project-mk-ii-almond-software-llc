import "./App.css";
import React, { Component, useState, useEffect } from "react";
import {
	Modal,
	Grid,
	Typography,
	Button,
	List,
	Card,
	CardHeader,
	ListItem,
	ListItemText,
	ListItemIcon,
	Checkbox,
	Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import CloseIcon from "@material-ui/icons/Close";
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
import useWindowDimensions from "./components/windowDimensions/useWindowDimensions";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import axios from "axios";
import BattleMenu from "../src/components/battle/battleMenu.js";

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		margin: "auto",
		// left: `${left}%`,
		// transform: `translate(-${top}%, -${left}%)`,
	};
}

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
	card: {
		justifyContent: "center",
		alignItems: "center",
		width: 300,
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
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		width: "100%",
	},
	cardHeader: {
		padding: theme.spacing(2, 2),
	},
	list: {
		width: 300,
		height: 180,
		backgroundColor: theme.palette.background.paper,
		overflow: "auto",
	},
	button: {
		margin: theme.spacing(0.5, 0),
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

function not(a, b) {
	return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
	return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
	return [...a, ...not(b, a)];
}

export default function App() {
	const classes = useStyles();
	const { height, width } = useWindowDimensions();
	const [matched, setMatched] = useState(false);
	const [appHeight, setAppHeight] = useState(height);
	const [value, setValue] = useState(0);
	let history = useHistory();
	const modalStyle = useState(getModalStyle);
	const [playerTeam, setPlayerTeam] = useState([]);
	const [open, setOpen] = useState(false);
	const [monsterCollection, setMonsterCollection] = useState([]);
	const [checked, setChecked] = useState([]);
	let maxCapacity = 3;
	const [disabled, setDisabled] = useState(false);

	const monsterCollectionChecked = intersection(checked, monsterCollection);
	const playerTeamChecked = intersection(checked, playerTeam);

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

	const updatePlayerTeam = async () => {
		await axios.put(
			"http://localhost:8080/api/player/updatePlayerTeam/" +
				Cookies.get("user") +
				"/" +
				playerTeam.join()
		);
	};

	const getPlayerMonsterCollection = async () => {
		await axios
			.get(
				"http://localhost:8080/api/player/getPlayerMonsterCollection/" +
					Cookies.get("user")
			)
			.then((res) => {
				setMonsterCollection(res.data);
			});
	};

	const openModal = () => {
		setOpen(true);
	};

	const closeModal = () => {
		setOpen(false);
		updatePlayerTeam();
	};

	const customList = (title, items) => (
		<Card className={classes.card}>
			<CardHeader
				className={classes.cardHeader}
				avatar={
					<Checkbox
						onClick={handleToggleAll(items)}
						checked={
							numberOfChecked(items) === items.length && items.length !== 0
						}
						indeterminate={
							numberOfChecked(items) !== items.length &&
							numberOfChecked(items) !== 0
						}
						disabled={items.length === 0}
						inputProps={{ "aria-label": "all items selected" }}
					/>
				}
				title={title}
				subheader={`${numberOfChecked(items)}/${items.length} selected`}
			/>
			<Divider />
			<List className={classes.list} dense component="div" role="list">
				{items.map((value) => {
					const labelId = `transfer-list-all-item-${value}-label`;

					return (
						<ListItem
							key={value}
							role="listitem"
							button
							onClick={handleToggle(value)}
						>
							<ListItemIcon>
								<Checkbox
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{ "aria-labelledby": labelId }}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={` ${value}`} />
						</ListItem>
					);
				})}
				<ListItem />
			</List>
		</Card>
	);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const isPresentInPlayerTeam = () => {
		monsterCollectionChecked.forEach((monster) => {
			if (playerTeam.includes(monster)) {
				setDisabled(true);
			} else {
				setDisabled(false);
			}
		});
	};

	const numberOfChecked = (items) => intersection(checked, items).length;

	const handleToggleAll = (items) => () => {
		if (numberOfChecked(items) === items.length) {
			setChecked(not(checked, items));
		} else {
			setChecked(union(checked, items));
		}
	};

	const handleCheckedPlayerTeam = () => {
		setPlayerTeam(playerTeam.concat(monsterCollectionChecked));
		//setMonsterCollection(not(monsterCollection, monsterCollectionChecked));
		setChecked(not(checked, monsterCollectionChecked));
	};

	const handleCheckedMonsterCollection = () => {
		//setMonsterCollection(monsterCollection.concat(playerTeamChecked));
		setPlayerTeam(not(playerTeam, playerTeamChecked));
		setChecked(not(checked, playerTeamChecked));
	};

	useEffect(() => {
		getPlayerTeam();
		getPlayerMonsterCollection();
	}, []);

	useEffect(() => {
		isPresentInPlayerTeam();
	}, [monsterCollectionChecked]);

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
									onClick={openModal}
								>
									Change team
								</Button>
							</Grid>
							<Modal
								open={open}
								onClose={closeModal}
								className={classes.modal}
								contentLabel="Example Modal"
							>
								<Card className={classes.card}>
									<Grid
										container
										spacing={2}
										justify="center"
										alignItems="center"
										className={classes.root}
									>
										<Grid item>
											{customList("Monster Collection", monsterCollection)}
										</Grid>
										<Grid item>
											<Grid
												container
												direction="column"
												alignItems="center"
												justify="center"
											>
												<Button
													variant="outlined"
													size="small"
													className={classes.button}
													onClick={handleCheckedPlayerTeam}
													disabled={
														monsterCollectionChecked.length === 0 ||
														monsterCollectionChecked.length > maxCapacity ||
														monsterCollectionChecked.length +
															playerTeam.length >
															maxCapacity ||
														playerTeam.length === maxCapacity ||
														disabled
													}
													aria-label="move selected right"
												>
													Update Team
												</Button>
												<Button
													variant="outlined"
													size="small"
													className={classes.button}
													onClick={handleCheckedMonsterCollection}
													disabled={playerTeamChecked.length === 0}
													aria-label="move selected left"
												>
													Remove from Team
												</Button>
											</Grid>
										</Grid>
										<Grid item>{customList("Player Team", playerTeam)}</Grid>
									</Grid>
								</Card>
							</Modal>
						</Grid>
					</Grid>
				</AppBar>
			</div>
		</div>
	);
}

{
}
