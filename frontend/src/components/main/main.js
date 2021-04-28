import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Grid,
	Typography,
	Button,
	// List,
	// Card,
	// CardHeader,
	// ListItem,
	// ListItemText,
	// ListItemIcon,
	// Checkbox,
	// Divider,
} from "@material-ui/core";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import ImageLoader from '../imageLoader/imageLoader.js';
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
		// backgroundColor: theme.palette.background.paper,
		// padding: theme.spacing(2),
	},
	names: {
		// borderStyle: "solid",
		maxWidth: "auto",
		[theme.breakpoints.between("300", "700")]: {
			fontSize: "12px",
		},
		[theme.breakpoints.between("710", "750")]: {
			fontSize: "16px",
		},
		[theme.breakpoints.between("768", "lg")]: {
			fontSize: "20px",
		},
	},
}));

export default function Main() {
	const classes = useStyles();
	const [monsterCollection, setMonsterCollection] = useState([]);

	const getPlayerMonsterCollection = async () => {
		await axios
			.get(
				"https://almond-pistachio-back-end.herokuapp.com/api/player/getPlayerMonsterCollection/" +
				Cookies.get("user")
			)
			.then((res) => {
				setMonsterCollection(res.data);
			});
	};

	useEffect(() => {
		getPlayerMonsterCollection();
	}, []);

	return (
		<div className={classes.root}>
			<Grid
				container
				item
				spacing={4}
				justify="space-around"
				alignItems="center"
			>
				{monsterCollection.map((e, i) => {
					return (
						<Grid item xs={4} key={i}>
							<Grid
								container
								direction="column"
								alignItems="center"
								justify="center"
							>
								<div style={{padding: '10px'}}>
									<ImageLoader name={e} side="icon" />
								</div>
								<Button size="small" variant="contained" color="primary" style={{ backgroundColor: '#4A7562' }}>
									<Typography className={classes.names}>{e}</Typography>
								</Button>
							</Grid>
						</Grid>
					);
				})}
			</Grid>
		</div>
	);
}
