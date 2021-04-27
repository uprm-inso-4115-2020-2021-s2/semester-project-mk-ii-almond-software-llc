import { React, } from "react";
import { Grid, Button, makeStyles, CircularProgress } from "@material-ui/core";


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

export default function BattleLoading(props) {

	const classes = useStyles();

	return (
		<div>
			<Grid container justify="flex-start" alignItems="center">
				<Button
					className={classes.back}
					variant="contained"
					color="primary"
					onClick={() => {
						props.leaveRoom();
					}}
				>
					Back
						</Button>
			</Grid>
			<Grid item >
				<CircularProgress />
			</Grid>
		</div>
	);
}