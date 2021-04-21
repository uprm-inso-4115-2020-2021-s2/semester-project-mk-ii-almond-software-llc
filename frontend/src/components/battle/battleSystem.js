import { React, useState } from "react";
import { Typography, Grid, Button, makeStyles } from "@material-ui/core";
import SockJsClient from 'react-stomp';
import AndroidIcon from "@material-ui/icons/Android";
import AppleIcon from "@material-ui/icons/Apple";
import BattleSystemMenu from '../battle/battleSystemMenu';
import Cookies from "js-cookie";


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
	const [topics, setTopics] = useState([`/topic/${battleID}`]);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [clientRef, setClientRef] = useState();

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

	return (
		<div>
			{/* this grid container holds the back button */}
			<Grid container justify="flex-start" alignItems="center">
				<Button
					className={classes.back}
					variant="contained"
					color="primary"
					onClick={() => {
						leaveRoom();
					}}
				>
					Back
				</Button>
			</Grid>

			{/* this grid container holds the battle messages */}
			<Grid container direction="column" justify="center" alignItems="center">
				{messages.map((e, i) => {
					return (
						<div key={i}>
							{e.server ?
								<Grid item style={{ padding: '10px', fontStyle: 'italic' }} key={i}>
									<Typography>{e.content}</Typography>
								</Grid>
								:
								<Grid item style={{ padding: '10px' }} key={i}>
									<Typography>{e.username}: {e.content}</Typography>
								</Grid>}
						</div>
					)
				})}
			</Grid>

			{/* this grid container holds the battle ui */}
			<BattleSystemMenu />

			{/* this is the websocket :) */}
			<SockJsClient
				url='http://localhost:8080/websocket-chat/'
				topics={topics}
				onConnect={() => {
					console.log("connected");
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
					console.log(e)
					const temp = [...messages];
					temp.push(e);
					setMessages(temp);
				}}
				ref={(client) => { setClientRef(client) }} />
		</div>
	);
}
