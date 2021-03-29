import React, { Component, useState } from "react";
import { Typography, Grid, TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: "200px",
		},
	},
	buttonLayout: {
		textAlign: "center",
	},
}));

export default function Main(props) {
	const [name, setName] = useState("");
	const [maxHp, setMaxHp] = useState(0);
	const [baseDmg, setBaseDmg] = useState(0);
	const [speed, setSpeed] = useState(0);
	const [moveName1, setMoveName1] = useState("");
	const [moveDmg1, setMoveDmg1] = useState(0);
	const [accuracy1, setAccuracy1] = useState(0);
	const [critRate1, setCritRate1] = useState(0);
	const [moveName2, setMoveName2] = useState("");
	const [moveDmg2, setMoveDmg2] = useState(0);
	const [accuracy2, setAccuracy2] = useState(0);
	const [critRate2, setCritRate2] = useState(0);
	const [moveName3, setMoveName3] = useState("");
	const [moveDmg3, setMoveDmg3] = useState(0);
	const [accuracy3, setAccuracy3] = useState(0);
	const [critRate3, setCritRate3] = useState(0);
	let history = useHistory();

	const postMonster = async () => {
		await axios({
			method: "post",
			url: "https://almond-pistachio-back-end.herokuapp.com/api/monster/add",
			data: {
				name: name,
				stats: {
					hp: maxHp,
					maxHp: maxHp,
					baseDmg: baseDmg,
					spd: speed,
				},
				moves: [
					{
						name: moveName1,
						baseDamage: moveDmg1,
						accuracy: accuracy1,
						critRate: critRate1,
					},
					{
						name: moveName2,
						baseDamage: moveDmg2,
						accuracy: accuracy2,
						critRate: critRate2,
					},
					{
						name: moveName3,
						baseDamage: moveDmg3,
						accuracy: accuracy3,
						critRate: critRate3,
					},
				],
			},
		});
		history.push("/form");
	};

	const classes = useStyles();
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<form className={classes.root} noValidate autoComplete="off">
				<Grid
					container
					alignItems="center"
					justifyContent="center"
					direction="row"
				>
					<div>
						<Grid
							container
							alignItems="center"
							justifyContent="center"
							direction="column"
						>
							<Grid
								item
								container
								alignItems="center"
								justify="center"
								direction="column"
							>
								<TextField
									variant="outlined"
									margin="normal"
									required
									fullWidth
									value={name}
									type="text"
									onChange={(e) => setName(e.target.value)}
									id="name"
									label="Name"
									name="name"
								/>
								<TextField
									variant="outlined"
									margin="normal"
									required
									fullWidth
									value={maxHp}
									type="number"
									onChange={(e) => setMaxHp(e.target.value)}
									id="maxHp"
									label="Max HP"
									name="maxHp"
								/>
								<TextField
									variant="outlined"
									margin="normal"
									required
									fullWidth
									value={baseDmg}
									type="number"
									onChange={(e) => setBaseDmg(e.target.value)}
									id="baseDmg"
									label="Base Damage"
									name="baseDmg"
								/>
								<TextField
									variant="outlined"
									margin="normal"
									required
									fullWidth
									value={speed}
									type="number"
									onChange={(e) => setSpeed(e.target.value)}
									id="speed"
									label="Speed"
									name="speed"
								/>
							</Grid>
						</Grid>
					</div>
					<div>
						<Grid
							container
							alignItems="center"
							justifyContent="center"
							direction="column"
						>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								value={moveName1}
								type="text"
								onChange={(e) => setMoveName1(e.target.value)}
								id="moveName"
								label="Move name1"
								name="moveName"
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								value={moveDmg1}
								type="number"
								onChange={(e) => setMoveDmg1(e.target.value)}
								id="moveDmg"
								label="Move Damage"
								name="moveDmg"
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								value={accuracy1}
								type="number"
								onChange={(e) => setAccuracy1(e.target.value)}
								id="accuracy"
								label="Accuracy"
								name="accuracy"
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								value={critRate1}
								type="number"
								onChange={(e) => setCritRate1(e.target.value)}
								id="critRate"
								label="Crit Rate"
								name="critRate"
							/>
						</Grid>
					</div>
					<div>
						<Grid
							container
							alignItems="center"
							justifyContent="center"
							direction="column"
						>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								value={moveName2}
								type="text"
								onChange={(e) => setMoveName2(e.target.value)}
								id="moveName"
								label="Move name2"
								name="moveName"
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								value={moveDmg2}
								type="number"
								onChange={(e) => setMoveDmg2(e.target.value)}
								id="moveDmg"
								label="Move Damage"
								name="moveDmg"
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								value={accuracy2}
								type="number"
								onChange={(e) => setAccuracy2(e.target.value)}
								id="accuracy"
								label="Accuracy"
								name="accuracy"
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								value={critRate2}
								type="number"
								onChange={(e) => setCritRate2(e.target.value)}
								id="critRate"
								label="Crit Rate"
								name="critRate"
							/>
						</Grid>
					</div>
					<div>
						<Grid
							container
							alignItems="center"
							justifyContent="center"
							direction="column"
						>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								value={moveName3}
								type="text"
								onChange={(e) => setMoveName3(e.target.value)}
								id="moveName"
								label="Move name3"
								name="moveName"
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								value={moveDmg3}
								type="number"
								onChange={(e) => setMoveDmg3(e.target.value)}
								id="moveDmg"
								label="Move Damage"
								name="moveDmg"
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								value={accuracy3}
								type="number"
								onChange={(e) => setAccuracy3(e.target.value)}
								id="accuracy"
								label="Accuracy"
								name="accuracy"
							/>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								value={critRate3}
								type="number"
								onChange={(e) => setCritRate3(e.target.value)}
								id="critRate"
								label="Crit Rate"
								name="critRate"
							/>
						</Grid>
					</div>

					<div className={classes.buttonLayout}>
						<Button variant="contained" onClick={postMonster}>
							Save
						</Button>
					</div>
				</Grid>
			</form>
		</div>
	);
}
