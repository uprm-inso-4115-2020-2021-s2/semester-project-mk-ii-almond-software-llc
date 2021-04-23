import { React, useState, useEffect } from "react";
import { Typography, Grid, Button, makeStyles, CircularProgress } from "@material-ui/core";
import SockJsClient from 'react-stomp';
import AndroidIcon from "@material-ui/icons/Android";
import AppleIcon from "@material-ui/icons/Apple";
import BattleMenu from './battleMenu';
import BattleAlert from './battleAlert';
import BattleInfo from './battleInfo';
import BattleLoading from './battleLoading';
import Cookies from "js-cookie";
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
	},
	buttonMenuButtons: {
		backgroundColor: "white"
	},
}));

export default function BattleSystem(props) {

	const classes = useStyles();
	const [player] = useState(props.player);
	const [battleID, setBattleID] = useState(props.battleID);
	const [battle, setBattle] = useState();
	const [topics, setTopics] = useState([`/topic/${battleID}`]);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [clientRef, setClientRef] = useState();
	const [showLoading, setShowLoading] = useState(true);
	const [playerMonster, setPlayerMonster] = useState();
	const [enemyMonster, setEnemyMonster] = useState();
	const [showIdle, setShowIdle] = useState(false);
	const [showMenu, setShowMenu] = useState(true);
	const [showMoves, setShowMoves] = useState(false);
	const [showTeam, setShowTeam] = useState(false);

	useEffect(() => {
		console.log(battle);
	}, [battle])

	const updateBattle = async () => {
		await axios.get("http://localhost:8080/api/battle/" + battleID).then(res => {
			setBattle(res.data);

			if (res.data.victor === "") {
				console.log("victor found!")
				// terminate
			} else if (!res.data.activeMonster1.stats.hp) {
				console.log("monster 1 died :(")
				if (res.data.firstPlayerID === player) {
					// showTeam = true if you are player 1
				} else {
					sendSkip(0);
				}
			} else if (!res.data.activeMonster2.stats.hp) {
				console.log("monster 2 died :(")
				if (res.data.secondPlayerID === player) {
					// showTeam = true if you are player 2
				} else {
					sendSkip(1);
				}
			} else {
				console.log("turning off toggle");
				setShowMenu(true)
				setShowMoves(false)
				setShowTeam(false)
				setShowIdle(false)
			}

			setPlayerMonster(player === res.data.firstPlayerID ? res.data.activeMonster1 : res.data.activeMonster2);
			setEnemyMonster(player === res.data.firstPlayerID ? res.data.activeMonster2 : res.data.activeMonster1);
			setShowLoading(false);
		})
	}

	const sendMessage = () => {
		clientRef.sendMessage(`/app/sendMessage/${battleID}`, JSON.stringify({
			player: player,
			message: message,
			server: false
		}));
	};

	const leaveRoom = () => {
		props.setMatched(!props.matched);
		const tempTopics = []
		setTopics(tempTopics)
		const tempMessages = []
		setMessages(tempMessages)
		clientRef.disconnect()
	}

	const sendMove = (index) => {
		let playerIndex = player === battle.firstPlayerID ? 0 : 1;
		console.log('sending move:', playerIndex + '0' + index);
		clientRef.sendMessage(`/app/sendAction/${battleID}`, JSON.stringify({
			username: player,
			server: true,
			content: playerIndex + '0' + index
		}));
		toggleIdle();
	}

	const sendSwap = (index) => {
		let playerIndex = player === battle.firstPlayerID ? 0 : 1;
		console.log('sending swap:', playerIndex + '1' + index);
		clientRef.sendMessage(`/app/sendAction/${battleID}`, JSON.stringify({
			username: player,
			server: true,
			content: playerIndex + '1' + index
		}));
		toggleIdle();
	}

	const sendSkip = (playerIndex) => {
		console.log('sending skip:', playerIndex + '20');
		clientRef.sendMessage(`/app/sendAction/${battleID}`, JSON.stringify({
			username: player,
			server: true,
			content: playerIndex + '20'
		}));
	}

	const toggleMenu = () => {
		setShowMenu(!showMenu)
		setShowMoves(false)
		setShowTeam(false)
		setShowIdle(false)
	}

	const toggleMoves = () => {
		setShowMenu(false)
		setShowMoves(!showMoves)
		setShowTeam(false)
		setShowIdle(false)
	}

	const toggleTeam = () => {
		setShowMenu(false)
		setShowMoves(false)
		setShowTeam(!showTeam)
		setShowIdle(false)
	}

	const toggleIdle = () => {
		setShowMenu(false)
		setShowMoves(false)
		setShowTeam(false)
		setShowIdle(!showIdle)
	}

	return (
		<div>
			<Grid container
				direction="column"
				justify="center"
				alignItems="center"
				style={{ justifyContent: "space-between", height: props.appHeight }}>

				{showLoading ? <BattleLoading leaveRoom={leaveRoom} /> :
					<div>
						<BattleAlert player={props.player} battle={battle} messages={messages} />
						<BattleInfo enemyMonster={enemyMonster} playerMonster={playerMonster} />
						<BattleMenu
							sendMove={sendMove}
							sendSwap={sendSwap}
							leaveRoom={leaveRoom}
							showMenu={showMenu}
							showMoves={showMoves}
							showTeam={showTeam}
							showIdle={showIdle}
							toggleMenu={toggleMenu}
							toggleMoves={toggleMoves}
							toggleTeam={toggleTeam}
							toggleIdle={toggleIdle}
							player={props.player}
							battle={battle} />
					</div>
				}

				{/* this is the websocket :) */}
				<SockJsClient
					url='http://localhost:8080/websocket/'
					topics={topics}
					onConnect={() => {
						console.log("connected");
						clientRef.sendMessage(`/app/updateBattle/${battleID}`, props.battleReady);
						clientRef.sendMessage(`/app/addUser/${battleID}`, JSON.stringify({
							username: player,
							server: true,
							content: player + " has connected!"
						}));
					}}
					onDisconnect={() => {
						console.log("disconnected");
					}}
					onMessage={(e) => {
						if (e === true) {
							console.log("boolean object:", e)
							updateBattle()
						}
						if (typeof e == typeof {}) {
							console.log("message object:", e)
							const temp = [...messages];
							temp.push(e);
							setMessages(temp);
						}
					}}
					ref={(client) => { setClientRef(client) }} />
			</Grid>
		</div>
	);
}
