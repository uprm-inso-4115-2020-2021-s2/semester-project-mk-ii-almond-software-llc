import { React, useState, useEffect } from "react";
import {
	Typography,
	Grid,
	Button,
	makeStyles,
	CircularProgress,
} from "@material-ui/core";
import SockJsClient from "react-stomp";
// import AndroidIcon from "@material-ui/icons/Android";
// import AppleIcon from "@material-ui/icons/Apple";
// import BattleMenu from "./battleMenu";
import BattleAlert from "./battleAlert";
import BattleInfo from "./battleInfo";
import BattleLoading from "./battleLoading";
// import Cookies from "js-cookie";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	back: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: "green",
		"&:hover": {
			backgroundColor: "darkgreen",
		},
		alignSelf: "start",
	},
	progress: {
		background: "grey",
		borderRadius: "1rem",
		width: "15rem",
		margin: theme.spacing(2),
		marginLeft: "10rem",

		[theme.breakpoints.between("300", "700")]: {
			width: "10rem",
			marginLeft: 0,
		},
		[theme.breakpoints.between("768", "810")]: {
			marginLeft: "3rem",
		},
	},
	progressBar: {
		borderRadius: "1rem",
		backgroundColor: "orange",
		width: "50%",

		[theme.breakpoints.between("300", "700")]: {
			marginLeft: 0,
			width: "50%",
		},
	},
	monsterIcon: {
		fontSize: "4rem",
	},
	buttonMenu: {
		backgroundColor: "#f2f2f2",
		borderRadius: '10px'
	},
	buttonMenuButtons: {
		backgroundColor: "#4A7562",
	},
}));

export default function BattleSystem(props) {
	const classes = useStyles();
	const [player] = useState(props.player);
	const [battleID, /**setBattleID */] = useState(props.battleID);
	const [battle, setBattle] = useState();
	const [topics, setTopics] = useState([`/topic/${battleID}`]);
	// const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [clientRef, setClientRef] = useState();
	const [showLoading, setShowLoading] = useState(true);
	const [playerMonster, setPlayerMonster] = useState();
	const [enemyMonster, setEnemyMonster] = useState();
	const [showIdle, setShowIdle] = useState(false);
	const [showMenu, setShowMenu] = useState(true);
	const [showMoves, setShowMoves] = useState(false);
	const [showTeam, setShowTeam] = useState(false);
	const [/**lockMenu */, setLockMenu] = useState(false);
	const [playerMoves, setPlayerMoves] = useState();
	const [playerTeam, setPlayerTeam] = useState();
	const [monster, setMonster] = useState();
	const [victorFound, setVictorFound] = useState(false);

	useEffect(() => {
		console.log(battle);
	}, [battle]);

	const updateBattle = async () => {
		await axios
			.get("https://almond-pistachio-back-end.herokuapp.com/api/battle/" + battleID)
			.then((res) => {
				setBattle(res.data);
				console.log("updating battle");

				if (res.data.victor !== "") {
					if (res.data.victor === player && res.data.firstPlayerID === player) {
						console.log(player, " won");
					} else if (res.data.victor !== player) {
						console.log(player, " lost");
					}
					if (
						res.data.victor === player &&
						res.data.secondPlayerID === player
					) {
						console.log(player, " won");
					} else if (res.data.victor !== player) {
						console.log(player, " lost");
					}
					console.log("victor found!");
					setVictorFound(true);
					setShowMenu(false);
					setShowMoves(false);
					setShowTeam(false);
					setShowIdle(false);
					setLockMenu(false);
					setTimeout(leaveRoom, 5000);
					// terminate
				} else if (!res.data.activeMonster1.stats.hp) {
					console.log("monster 1 died :(");
					if (res.data.firstPlayerID === player) {
						setShowMenu(false);
						setShowMoves(false);
						setShowTeam(true);
						setShowIdle(false);
						setLockMenu(true);
					} else {
						sendSkip(1);
					}
				} else if (!res.data.activeMonster2.stats.hp) {
					console.log("monster 2 died :(");
					if (res.data.secondPlayerID === player) {
						setShowMenu(false);
						setShowMoves(false);
						setShowTeam(true);
						setShowIdle(false);
						setLockMenu(true);
					} else {
						sendSkip(0);
					}
				} else {
					console.log("turning off toggle");
					setShowMenu(true);
					setShowMoves(false);
					setShowTeam(false);
					setShowIdle(false);
				}

				setPlayerMonster(
					player === res.data.firstPlayerID
						? res.data.activeMonster1
						: res.data.activeMonster2
				);
				setEnemyMonster(
					player === res.data.firstPlayerID
						? res.data.activeMonster2
						: res.data.activeMonster1
				);
				setPlayerMoves(
					player === res.data.firstPlayerID
						? res.data.activeMonster1.moves
						: res.data.activeMonster2.moves
				);
				setPlayerTeam(
					player === res.data.firstPlayerID
						? res.data.firstPlayerTeam
						: res.data.secondPlayerTeam
				);
				setMonster(
					player === res.data.firstPlayerID
						? res.data.activeMonster1
						: res.data.activeMonster2
				);

				setShowLoading(false);
			});
	};

	// const sendMessage = () => {
	// 	clientRef.sendMessage(
	// 		`/app/sendMessage/${battleID}`,
	// 		JSON.stringify({
	// 			player: player,
	// 			message: message,
	// 			server: false,
	// 		})
	// 	);
	// };

	const forfeitBattle = async () => {
		await axios
			.put(
				"https://almond-pistachio-back-end.herokuapp.com/api/battle/forceVictor/" +
				battleID +
				"/" +
				player
			)
			.then((res) => {
				console.log(res.data, player, "This is the forfeit battle");
				if (res.data) {
					console.log("forfeit battle");
					clientRef.sendMessage(`/app/updateBattle/${battleID}`, true);
				}
			});
	};

	const leaveRoom = async () => {
		props.setCallDelete(!props.callDelete);
		props.setMatched(!props.matched);
		const tempTopics = [];
		setTopics(tempTopics);
		const tempMessages = [];
		setMessages(tempMessages);
		clientRef.disconnect();
	};

	const sendMove = (index) => {
		let playerIndex = player === battle.firstPlayerID ? 0 : 1;
		console.log("sending move:", playerIndex + "0" + index);
		clientRef.sendMessage(
			`/app/sendAction/${battleID}`,
			JSON.stringify({
				username: player,
				server: true,
				content: playerIndex + "0" + index,
			})
		);
		toggleIdle();
	};

	const sendSwap = (index) => {
		let playerIndex = player === battle.firstPlayerID ? 0 : 1;
		console.log("sending swap:", playerIndex + "1" + index);
		console.log(battle);
		clientRef.sendMessage(
			`/app/sendAction/${battleID}`,
			JSON.stringify({
				username: player,
				server: true,
				content: playerIndex + "1" + index,
			})
		);
		toggleIdle();
	};

	const sendSkip = (playerIndex) => {
		console.log("sending skip:", playerIndex + "20");
		clientRef.sendMessage(
			`/app/sendAction/${battleID}`,
			JSON.stringify({
				username: player,
				server: true,
				content: playerIndex + "20",
			})
		);
	};

	const toggleMenu = () => {
		setShowMenu(!showMenu);
		setShowMoves(false);
		setShowTeam(false);
		setShowIdle(false);
	};

	const toggleMoves = () => {
		setShowMenu(false);
		setShowMoves(!showMoves);
		setShowTeam(false);
		setShowIdle(false);
	};

	const toggleTeam = () => {
		setShowMenu(false);
		setShowMoves(false);
		setShowTeam(!showTeam);
		setShowIdle(false);
	};

	const toggleIdle = () => {
		setShowMenu(false);
		setShowMoves(false);
		setShowTeam(false);
		setShowIdle(!showIdle);
	};

	return (
		<div>
			{showLoading ? (
				<BattleLoading leaveRoom={leaveRoom} appHeight={props.appHeight} battleID={battleID} />
			) : (
				<div>
					<Grid
						container
						direction="column"
						justify="space-around"
						alignItems="center"
						style={{ justifyContent: "space-between", height: props.appHeight }}>
						<Grid item>
							<Button variant="contained" color="primary" className={classes.buttonMenuButtons}>
								<Typography>Opponent: {player === battle.firstPlayerID ? battle.secondPlayerID : battle.firstPlayerID}</Typography>
							</Button>
						</Grid>
						<Grid item>
							<BattleInfo
								enemyMonster={enemyMonster}
								playerMonster={playerMonster} />
						</Grid>
						{victorFound ?
							<Grid
								item
								container
								alignItems="center"
								style={{ width: props.appWidth, height: props.appHeight * 0.30, padding: '15px', }}>
								<Grid item xs={12}>
									<Button
										variant="contained"
										color="primary"
										className={classes.buttonMenuButtons}
										onClick={() => {
											leaveRoom()
										}}>
										<Typography>Battle over, {battle.victor} won!</Typography>
									</Button>
								</Grid>
							</Grid>
							:
							<Grid
								item
								container
								alignItems="center"
								style={{
									width: props.appWidth,
									height: props.appHeight * 0.30,
									backgroundColor: "#f2f2f2",
									borderRadius: '10px',
									padding: '15px',
								}}>
								{showMenu ?
									<Grid item container spacing={4}>
										<Grid item xs={6}>
											<Button className={classes.buttonMenuButtons} onClick={toggleMoves}>
												<Typography style={{ color: 'white' }}>Moves</Typography>
											</Button>
											<Typography style={{ fontSize: '10px', fontWeight: 'lighter', fontStyle: 'italic' }}>Attacks!</Typography>
										</Grid>
										<Grid item xs={6}>
											<Button className={classes.buttonMenuButtons} onClick={toggleTeam}>
												<Typography style={{ color: 'white' }}>Team</Typography>
											</Button>
											<Typography style={{ fontSize: '10px', fontWeight: 'lighter', fontStyle: 'italic' }}>Mini-army?</Typography>
										</Grid>
										<Grid item xs={12}>
											<Button className={classes.buttonMenuButtons} onClick={forfeitBattle}>
												<Typography style={{ color: 'white' }}>Forfeit</Typography>
											</Button>
											<Typography style={{ fontSize: '10px', fontWeight: 'lighter', fontStyle: 'italic' }}>Next time...</Typography>
										</Grid>
									</Grid> : <div />}

								{showMoves ?
									<Grid item container spacing={4}>
										<Grid item xs={6}>
											<Button disabled={props.lockMenu} className={classes.buttonMenuButtons} onClick={toggleMenu}>
												<Typography style={{ color: 'white' }}>Back</Typography>
											</Button>
										</Grid>
										{playerMoves.map((e, i) => {
											return (
												<Grid item xs={6} key={i} >
													<Button className={classes.buttonMenuButtons}
														onClick={() => {
															sendMove(i);
															setLockMenu(false);
														}}>
														<Typography style={{ color: 'white' }}>
															{e.name.length <= 10 ? e.name : e.name.slice(0, 6) + '...'}
														</Typography>
													</Button>
													<Typography style={{ fontSize: '10px', fontWeight: 'lighter', fontStyle: 'italic' }}>DMG: {e.baseDamage}</Typography>
												</Grid>
											)
										})}
									</Grid> : <div />}

								{showTeam ?
									<Grid item container spacing={4}>
										<Grid item xs={6}>
											<Button disabled={props.lockMenu} className={classes.buttonMenuButtons} onClick={toggleMenu}>
												<Typography style={{ color: 'white' }}>Back</Typography>
											</Button>
										</Grid>
										{playerTeam.map((e, i) => {
											return (
												<Grid item xs={6} key={i}>
													<Button disabled={monster.name === e.name || e.stats.hp === 0} className={classes.buttonMenuButtons}
														onClick={() => {
															sendSwap(i);
															setLockMenu(false);
														}}>
														<Typography style={{ color: 'white' }}>{e.name}</Typography>
													</Button>
													{e.stats.hp === 0 || (monster.name === e.name && monster.stats.hp === 0)
														? <Typography style={{ fontSize: '10px', fontWeight: 'lighter', fontStyle: 'italic' }}>DEAD</Typography>
														: <Typography style={{ fontSize: '10px', fontWeight: 'lighter', fontStyle: 'italic' }}>ALIVE</Typography>}
												</Grid>
											)
										})}
									</Grid> : <div />}

								{showIdle ?
									<Grid item container spacing={4}>
										<Grid item xs={4} />
										<Grid item xs={12}>
											<CircularProgress />
										</Grid>
										<Grid item xs={4} />
									</Grid> : <div />}
							</Grid>}
					</Grid>
				</div>
			)}

			{/* this is the websocket :) */}
			<SockJsClient
				url="https://almond-pistachio-back-end.herokuapp.com/websocket/"
				topics={topics}
				onConnect={() => {
					console.log("connected");
					clientRef.sendMessage(
						`/app/updateBattle/${battleID}`,
						props.battleReady
					);
					clientRef.sendMessage(
						`/app/addUser/${battleID}`,
						JSON.stringify({
							username: player,
							server: true,
							content: player + " has connected!",
						})
					);
				}}
				onDisconnect={() => {
					console.log(player, "disconnected");
					forfeitBattle()
				}}
				onMessage={(e) => {
					if (e === true) {
						console.log("boolean object:", e);
						updateBattle();
					}
					if (typeof e == typeof {}) {
						console.log("message object:", e);
						if (e.content === "DISCONNECT") {
							console.log(e.username === player ? "you left!" : "other player left!")
							leaveRoom()
						} else {
							const temp = [...messages];
							temp.push(e);
							setMessages(temp);
						}
					}
				}}
				ref={(client) => {
					setClientRef(client);
				}}
			/>
		</div>
	);
}
