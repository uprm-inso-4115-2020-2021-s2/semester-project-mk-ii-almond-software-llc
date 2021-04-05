import React, { Component, useState } from "react";
import {
	Typography,
	Grid,
	Button,
	IconButton,
	makeStyles,
} from "@material-ui/core";
import BattleSystem from "./battleSystem";
import PublicIcon from "@material-ui/icons/Public";
import Cookies from "js-cookie";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	matchmaking: {
		margin: theme.spacing(3, 0, 2),
		// backgroundColor: "gray",
		// "&:hover": {
		// 	backgroundColor: "darkgray",
		// },
	},
}));

export default function Battle(props) {
	const classes = useStyles();
	// const [matched, setMatched] = useState(false);
	const player = Cookies.get("user");
	const [battleID, setBattleID] = useState("");

	//axios queuePlayer
	const queuePlayer = async () => {
		await axios
			.put("http://localhost:8080/api/battle/queue?player=" + player)
			.then((res) => {
				axios({
					method: "put",
					url: "http://localhost:8080/api/player/" + player + "/" + res.data.battleID,
				});
				setBattleID(res.data.battleID);
				props.setMatched(!props.matched);
			});
	};

	return (
		<div>
			{props.matched ? (
				<div>
					<BattleSystem
						matched={props.matched}
						setMatched={props.setMatched}
						player={player}
						battleID={battleID}
					/>
				</div>
			) : (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: props.appHeight,
					}}
				>
					<Grid
						container
						alignItems="center"
						justify="center"
						direction="column"
					>
						<Grid item>
							<div style={{ backgroundColor: "green", borderRadius: 100 }}>
								<IconButton
									aria-label="search"
									color="primary"
									onClick={() => {
										queuePlayer();
									}}
								>
									<PublicIcon style={{ fontSize: 75, color: "white" }} />
								</IconButton>
							</div>
						</Grid>
						<Grid item>
							<Button
								// variant="contained"
								size="large"
								color="primary"
								className={classes.matchmaking}
								onClick={() => {
									queuePlayer();
								}}
							>
								<Typography
									variant="h5"
									component="h5"
								>
									Matchmaking
								</Typography>
							</Button>
						</Grid>
					</Grid>
				</div>
			)}
		</div>
	);
}
