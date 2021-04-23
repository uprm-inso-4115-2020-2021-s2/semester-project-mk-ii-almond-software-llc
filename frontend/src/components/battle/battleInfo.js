import { React, useState, useEffect } from "react";
import { Typography, Grid, Button, makeStyles, CircularProgress, LinearProgress, Box } from "@material-ui/core";
import SockJsClient from 'react-stomp';
import PropTypes from 'prop-types';
import AndroidIcon from "@material-ui/icons/Android";
import AppleIcon from "@material-ui/icons/Apple";
import BattleMenu from './battleMenu';
import Cookies from "js-cookie";
import axios from "axios";

function LinearProgressWithLabel(props) {
	return (
		<Box display="flex" alignItems="center">
			<Box width="100%" mr={1}>
				<LinearProgress style={{ height: '10px', borderRadius: '10px' }} variant="determinate" {...props} />
			</Box>
			<Box minWidth={35}>
				<Typography variant="body2" color="textSecondary">{`${Math.round(
					props.value,
				)}%`}</Typography>
			</Box>
		</Box>
	);
}

LinearProgressWithLabel.propTypes = {
	/**
	 * The value of the progress indicator for the determinate and buffer variants.
	 * Value between 0 and 100.
	 */
	value: PropTypes.number.isRequired,
};

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

export default function BattleInfo(props) {

	const classes = useStyles();
	const [battle, setBattle] = useState(props.battle);
	const [player, setPlayer] = useState(props.player);

	return (
		<div>
			<Grid container spacing={4}>
				<Grid item xs={6}>
					<Typography className={classes.enemyButton}>{props.enemyMonster.name}</Typography>
					<LinearProgressWithLabel value={(props.enemyMonster.stats.hp / props.enemyMonster.stats.maxHp) * 100} />
				</Grid>

				<Grid item xs={6}>
					<AndroidIcon className={classes.monsterIcon} />
				</Grid>

				<Grid item xs={6}>
					<AppleIcon className={classes.monsterIcon} />
				</Grid>

				<Grid item xs={6}>
					<Typography className={classes.enemyButton}>{props.playerMonster.name}</Typography>
					<LinearProgressWithLabel value={(props.playerMonster.stats.hp / props.playerMonster.stats.maxHp) * 100} />
				</Grid>
			</Grid>
		</div>
	);
}