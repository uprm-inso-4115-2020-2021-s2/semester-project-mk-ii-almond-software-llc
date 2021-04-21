import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
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
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import Cookies from "js-cookie";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	main: {
		fontSize: "3rem",
	},
	root: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-around",
		overflow: "hidden",
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(2),
	},
	cardHeader: {
		padding: theme.spacing(1, 2),
	},
	list: {
		width: 200,
		height: 230,
		backgroundColor: theme.palette.background.paper,
		overflow: "auto",
	},
	button: {
		margin: theme.spacing(0.5, 0),
	},

	names: {
		// borderStyle: "solid",
		maxWidth: "auto",
		[theme.breakpoints.between("300", "700")]: {
			fontSize: "14px",
		},
		[theme.breakpoints.between("710", "750")]: {
			fontSize: "18px",
		},
		[theme.breakpoints.between("768", "lg")]: {
			fontSize: "22px",
		},
	},
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

export default function Main() {
	const classes = useStyles();
	const [monsterCollection, setMonsterCollection] = useState([]);
	const [playerTeam, setPlayerTeam] = useState([]);
	const [checked, setChecked] = useState([]);

	const monsterCollectionChecked = intersection(checked, monsterCollection);
	const playerTeamChecked = intersection(checked, playerTeam);

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

	const getPlayerTeam = async () => {
		await axios
			.get(
				"http://localhost:8080/api/player/getPlayerTeam/" + Cookies.get("user")
			)
			.then((res) => {
				setPlayerTeam(res.data);
			});
	};

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

	const numberOfChecked = (items) => intersection(checked, items).length;

	const handleToggleAll = (items) => () => {
		if (numberOfChecked(items) === items.length) {
			setChecked(not(checked, items));
		} else {
			setChecked(union(checked, items));
		}
	};

	const handleCheckedPlayerTeam = () => {
		setPlayerTeam(playerTeam.concat(playerTeamChecked));
		setMonsterCollection(not(monsterCollection, monsterCollectionChecked));
		setChecked(not(checked, monsterCollectionChecked));
	};

	const handleCheckedMonsterCollection = () => {
		setMonsterCollection(monsterCollection.concat(playerTeamChecked));
		setPlayerTeam(not(playerTeam, playerTeamChecked));
		setChecked(not(checked, playerTeamChecked));
	};

	const customList = (title, items) => (
		<Card>
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
							<ListItemText id={labelId} primary={`List item ${value + 1}`} />
						</ListItem>
					);
				})}
				<ListItem />
			</List>
		</Card>
	);

	useEffect(() => {
		getPlayerMonsterCollection();
		getPlayerTeam();
	}, []);

	return (
		<Grid
			container
			spacing={2}
			justify="center"
			alignItems="center"
			className={classes.root}
		>
			<Grid item>{customList("Choices", monsterCollection)}</Grid>
			<Grid item>
				<Grid container direction="column" alignItems="center">
					<Button
						variant="outlined"
						size="small"
						className={classes.button}
						onClick={handleCheckedPlayerTeam}
						disabled={monsterCollectionChecked.length === 0}
						aria-label="move selected right"
					>
						&gt;
					</Button>
					<Button
						variant="outlined"
						size="small"
						className={classes.button}
						onClick={handleCheckedMonsterCollection}
						disabled={playerTeamChecked.length === 0}
						aria-label="move selected left"
					>
						&lt;
					</Button>
				</Grid>
			</Grid>
			<Grid item>{customList("Chosen", playerTeam)}</Grid>
		</Grid>

		// <div className={classes.root}>
		// 	<Grid
		// 		container
		// 		item
		// 		spacing={4}
		// 		justify="space-around"
		// 		alignItems="center"
		// 	>
		// 		{monsterCollection.map((e, i) => {
		// 			return (
		// 				<Grid item xs={4} key={i}>
		// 					<Grid
		// 						container
		// 						direction="column"
		// 						alignItems="center"
		// 						justify="center"
		// 					>
		// 						<AccountCircleRoundedIcon
		// 							style={{ fontSize: "5rem", color: "green" }}
		// 						/>
		// 						<Typography className={classes.names}>{e}</Typography>
		// 					</Grid>
		// 				</Grid>
		// 			);
		// 		})}
		// 	</Grid>
		// </div>
	);
}
