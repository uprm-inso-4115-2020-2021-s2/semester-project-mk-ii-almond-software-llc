import { React, } from "react";
import { Grid, Button, makeStyles, CircularProgress, Typography } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
	back: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: "#4A7562",
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

	const deleteBattle = async () => {
        await axios.delete(
            "http://localhost:8080/api/battle/" + props.battleID
        );
    };

	return (
		<div>
			<Grid
				container
				justify="center"
				alignItems="center"
				direction="column"
				style={{ justifyContent: "center", height: props.appHeight }}>
				<Grid item>
					<Typography variant="h5" component="h5" style={{ padding: '20px' }}>SEARCHING</Typography>
				</Grid>
				<Grid item >
					<CircularProgress />
				</Grid>
				<Grid item>
					<Button
						className={classes.back}
						variant="contained"
						color="primary"
						onClick={() => {
							deleteBattle();
							props.leaveRoom();
						}}
					>
						<Typography>Cancel</Typography>
					</Button>
				</Grid>
			</Grid>

		</div>
	);
}