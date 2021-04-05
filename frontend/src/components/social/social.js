import React, { useState, useEffect, useCallback, Fragment } from "react";
import {
	Typography,
	Grid,
	Container,
	TextField,
	List,
	ListItem,
	Avatar,
	ListItemSecondaryAction,
	ListItemText,
	ListItemAvatar,
	Checkbox,
	Button,
	IconButton,
	Menu,
	MenuItem,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";

const useStyles = makeStyles((theme) => ({
	add: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: "green",
		"&:hover": {
			backgroundColor: "darkgreen",
		},
	},
	searchBox: {
		width: "20rem",
		justifyContent: "center",
		[theme.breakpoints.between("300", "700")]: {
			width: "10rem",
		},
		[theme.breakpoints.between("710", "750")]: {
			width: "15rem",
		},
		[theme.breakpoints.between("770", "xl")]: {
			width: "20rem",
		},
	},
	addFriendButton: {
		display: "inline",
		border: "2px solid black",
		backgroundColor: "#f2f2f2",
		marginLeft: "2rem",
	},
	friendsComponent: {
		width: "50%",
		display: "table-cell",
	},
	friendsList: {
		marginTop: "1rem",
		marginLeft: "20rem",
		[theme.breakpoints.between("300", "700")]: {
			marginLeft: "-2rem",
			width: "auto",
		},
		[theme.breakpoints.between("710", "750")]: {
			marginLeft: "2rem",
			width: "auto",
		},
		[theme.breakpoints.between("770", "xl")]: {
			marginLeft: "20rem",
			width: "auto",
		},
	},
	buttonsContainer: {
		paddingLeft: "3rem",
	},
	buttonsArrangement: {
		display: "block",
		display: "table-cell",
		border: "2px solid black",
		backgroundColor: "#f2f2f2",
		marginTop: "2rem",

		[theme.breakpoints.between("xs", "700")]: {
			marginLeft: "-2rem",
			width: "auto",
		},
		[theme.breakpoints.up("710")]: {
			marginLeft: "2rem",
			width: "auto",
		},
	},
	gridLayout: {
		display: "table",
		width: "100%",
		alignContent: "center",
		justifyContent: "center",
	},
}));

export default function Social() {
	const classes = useStyles();
	const [friendList, setFriendList] = useState([]);
	const [requestFriendList, setRequestFriendList] = useState([]);
	const [usernames, setUsernames] = useState([]);
	const [playerRequesting, setPlayerRequesting] = useState(Cookies.get("user"));
	const [playerBeingRequested, setPlayerBeingRequested] = useState(null);
	const [checked, setChecked] = useState([1]);
	const [friendAnchor, setFriendAnchor] = useState(null);
	const [requestAnchor, setRequestAnchor] = useState(null);
	const [current, setCurrent] = useState(null);
	const history = useHistory();

	const getFriendList = async () => {
		await axios
			.get(
				"http://localhost:8080/api/player/friendList?user=" +
				Cookies.get("user")
			)
			.then((res) => {
				setFriendList(res.data);
			});
	};

	const getRequestFriendList = async () => {
		await axios
			.get(
				"http://localhost:8080/api/player/requestFriendList?user=" +
				Cookies.get("user")
			)
			.then((res) => {
				setRequestFriendList(res.data);
			});
	};

	const getAllUsers = async () => {
		await axios.get("http://localhost:8080/api/player/username").then((res) => {
			setUsernames(res.data);
		});
	};

	const requestFriend = async () => {
		await axios.get(
			"http://localhost:8080/api/player/requestFriend/" +
			playerRequesting +
			"/" +
			playerBeingRequested
		);
	};

	const acceptFriend = async () => {
		await axios
			.put(
				"http://localhost:8080/api/player/acceptFriend/" +
				playerRequesting +
				"/" +
				current +
				"/yes"
			)
			.then(() => {
				window.location.reload();
			});
	};

	const rejectFriend = async () => {
		await axios
			.put(
				"http://localhost:8080/api/player/rejectFriend/" +
				playerRequesting +
				"/" +
				current +
				"/no"
			)
			.then(() => {
				window.location.reload();
			});
	};

	const removeFriend = async () => {
		await axios
			.put(
				"http://localhost:8080/api/player/removeFriend/" +
				current +
				"/" +
				playerRequesting
			)
			.then(() => {
				window.location.reload();
			});
	};

	const openFriendMenu = (event, value) => {
		setFriendAnchor(event.currentTarget);
		setCurrent(value);
	};

	const openRequestMenu = (event, value) => {
		setRequestAnchor(event.currentTarget);
		setCurrent(value);
	};

	const clickAccept = () => {
		setRequestAnchor(null);
		acceptFriend();
	};

	const clickDecline = () => {
		setRequestAnchor(null);
		rejectFriend();
	};

	const closeRequestMenu = () => {
		setRequestAnchor(null);
	};

	const closeFriendMenu = () => {
		setFriendAnchor(null);
	};

	const clickBattle = () => {
		setFriendAnchor(null);
		console.log("battle selected", current);
	};

	const clickTrade = () => {
		setFriendAnchor(null);
		console.log("trade selected", current);
	};

	const clickViewTeam = () => {
		setFriendAnchor(null);
		console.log("view team selected", current);
	};

	const clickRemove = () => {
		setFriendAnchor(null);
		removeFriend();
	};

	const addFriend = () => { };

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

	useEffect(() => {
		getRequestFriendList();
		getFriendList();
	}, []);

	return (
		<div>
			<Grid container alignContent="center" justify="center" direction="column">
				{/* <Grid container alignItems="center" justify="center" direction="column" style={{}}> */}
				<Grid container alignItems="center" justify="center" direction="row">
					<Grid item>
						<TextField
							label="Search"
							margin="normal"
							variant="outlined"
							onChange={(e) => setPlayerBeingRequested(e.target.value)}
						/>
					</Grid>
					<Grid item style={{ padding: "10px" }}>
						<Button
							className={classes.add}
							color="primary"
							variant="contained"
							onClick={() => {
								requestFriend();
							}}
						>
							Add
						</Button>
					</Grid>
				</Grid>
				{/* RequestFriendList */}
				{requestFriendList.length > 0 ?
					<Grid item >
						<Typography align="left" variant="h5">Friend Requests</Typography>
						<List>
							{requestFriendList.map((value) => {
								const labelId = `checkbox-list-secondary-label-${value}`;
								return (
									<ListItem
										key={value}
									// className={classes.friendsList}
									>
										<ListItemAvatar>
											<AccountCircleRoundedIcon style={{ fontSize: "4rem", color: 'green' }} />
											{/* <Avatar
										alt={`Avatar n°${value + 1}`}
										src={`/static/images/avatar/${value}.jpg`}
									/> */}
										</ListItemAvatar>
										<ListItemText
											id={labelId}
											primary={value}
											secondary={"Testing"}
										/>
										<ListItemSecondaryAction>
											<IconButton
												edge="end"
												aria-label="more"
												onClick={(e) => {
													openRequestMenu(e, value);
												}}
											>
												<MoreHorizIcon />
											</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
								);
							})}
						</List>
					</Grid> : <div />
				}
				{/* FriendList */}
				{friendList.length > 0 ?
					<Grid item>
						<Typography align="left" variant="h5">Friends List</Typography>
						<List>
							{friendList.map((value) => {
								const labelId = `checkbox-list-secondary-label-${value}`;
								return (
									<ListItem
										key={value}
									// className={classes.friendsList}
									>
										<ListItemAvatar>
											<AccountCircleRoundedIcon style={{ fontSize: "3rem", color: 'green' }} />
											{/* <Avatar
										alt={`Avatar n°${value + 1}`}
										src={`/static/images/avatar/${value}.jpg`}
									/> */}
										</ListItemAvatar>
										<ListItemText
											id={labelId}
											primary={`${value}`}
											secondary={"Testing"}
										/>
										<ListItemSecondaryAction>
											<IconButton
												edge="end"
												aria-label="more"
												onClick={(e) => {
													openFriendMenu(e, value);
												}}
											>
												<MoreHorizIcon />
											</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
								);
							})}
						</List>
					</Grid> : <div />
				}
			</Grid>
			<Menu
				id="simple-menu"
				anchorEl={friendAnchor}
				keepMounted
				open={Boolean(friendAnchor)}
				onClose={closeFriendMenu}
			>
				<MenuItem onClick={clickBattle}>Battle</MenuItem>
				<MenuItem onClick={clickTrade}>Trade</MenuItem>
				<MenuItem onClick={clickViewTeam}>View Team</MenuItem>
				<MenuItem onClick={clickRemove}>Remove</MenuItem>
			</Menu>
			{/* Request Friend List Menu */}
			<Menu
				id="simple-menu"
				anchorEl={requestAnchor}
				keepMounted
				open={Boolean(requestAnchor)}
				onClose={closeRequestMenu}
			>
				<MenuItem onClick={clickAccept}>Accept</MenuItem>
				<MenuItem onClick={clickDecline}>Decline</MenuItem>
			</Menu>
		</div>
	);
}
