import { React, useState } from "react";
import { Button, TextField, Grid } from "@material-ui/core";
import BattleComponent from "./BattleComponent";

export default function MatchmakingComponent() {
	const [view, setView] = useState(false);
	const [name, setName] = useState("N/A");
	const [room, setRoom] = useState("N/A");

	const switchView = () => {
		setView(!view);
	};

	const setupView = () => {
		return (
			<div>
				<Grid container direction="column" justify="center" alignItems="center">
					<Grid item style={{ padding: "10px" }}>
						<TextField
							id="outlined-basic"
							label="What's your name?"
							variant="outlined"
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
					</Grid>
					<Grid item style={{ padding: "10px" }}>
						<TextField
							id="outlined-basic"
							label="Which room?"
							variant="outlined"
							onChange={(e) => {
								setRoom(e.target.value);
							}}
						/>
					</Grid>
					<Grid item style={{ padding: "10px" }}>
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								switchView();
							}}
						>
							Find Battle
						</Button>
					</Grid>
				</Grid>
			</div>
		);
	};

	return (
		<div>
			{!view ? setupView() : <BattleComponent name={name} room={room} />}
		</div>
	);
}
