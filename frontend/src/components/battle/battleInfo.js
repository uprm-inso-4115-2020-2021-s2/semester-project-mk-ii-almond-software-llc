import { React, useState } from "react";
import { Typography, Grid, Button, makeStyles, CircularProgress } from "@material-ui/core";
import SockJsClient from 'react-stomp';
import AndroidIcon from "@material-ui/icons/Android";
import AppleIcon from "@material-ui/icons/Apple";
import BattleMenu from './battleMenu';
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

export default function BattleInfo(props) {

    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <Typography className={classes.enemyButton}>Enemy</Typography>
                    <div className={classes.progress} item spacing={3}>
                        <div className={classes.progressBar}>50%</div>
                    </div>
                </Grid>

                <Grid item xs={6}>
                    <AndroidIcon className={classes.monsterIcon} />
                </Grid>

                <Grid item xs={6}>
                    <AppleIcon className={classes.monsterIcon} />
                </Grid>

                <Grid item xs={6}>
                    <Typography className={classes.enemyButton}>Monster 1</Typography>
                    <div className={classes.progress} item spacing={3}>
                        <div className={classes.progressBar}>50%</div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}