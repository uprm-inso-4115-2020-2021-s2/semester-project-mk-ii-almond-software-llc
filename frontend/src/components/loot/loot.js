import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Grid,
	Typography,
	Button,
	Dialog,
	DialogActions,
	IconButton,
	Card,
	CardContent,
} from "@material-ui/core";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import axios from "axios";
import Cookies from "js-cookie";

const useStyles = makeStyles({
	root: {
		minWidth: 50,
		minHeight: 10,
		backgroundColor: "green",
	},
	pistachioText: {
		color: "white",
		fontSize: "1.3rem",
	},
});

export default function Loot() {
	const classes = useStyles();
	const [lootCrates, setLootCrates] = useState([]);
	const [shopCrates, setShopCrates] = useState([]);
	const [prize, setPrize] = useState();
	const normalCrateColor = "grey";
	const rareCrateColor = "blue";
	const epicCrateColor = "purple";
	const [currentLoot, setCurrentLoot] = useState(Cookies.get("Crate"));
	const [confirm, setConfirm] = useState(false);
	const [result, setResult] = useState(false);
	const [inventory, setInventory] = useState(false);
	const [shop, setShop] = useState(false);
	const [pistachios, setPistachios] = useState();

	const getLootCrates = async () => {
		await axios.get("http://localhost:8080/api/lootboxes").then((res) => {
			console.log(res.data);
			setShopCrates(res.data);
		});
	};

	const getPlayerPistachios = async () => {
		await axios
			.get("http://localhost:8080/api/player/" + Cookies.get("user"))
			.then((res) => {
				setPistachios(res.data.pistachios);
			});
	};

	const getLootPrize = async () => {
		await axios
			.get(
				"http://localhost:8080/api/lootbox/open/" +
					currentLoot +
					"/" +
					Cookies.get("user")
			)
			.then((res) => {
				setPrize(res.data.name);
			});
	};

	const handleLootCrateColor = (currentLoot) => {
		if (currentLoot === "Normal Crate") {
			return normalCrateColor;
		} else if (currentLoot === "Rare Crate") {
			return rareCrateColor;
		} else if (currentLoot === "Epic Crate") {
			return epicCrateColor;
		} else {
			return normalCrateColor;
		}
	};

	function handleConfirm() {
		setConfirm(!confirm);
	}
	function handleInventory() {
		setInventory(!inventory);
	}
	function handleShop() {
		setShop(!shop);
	}
	function handleResult() {
		getLootPrize();
		Cookies.set("Crate", "");
		setCurrentLoot("");
		setResult(!result);
	}

	useEffect(() => {
		getLootCrates();
		getPlayerPistachios();
	}, []);

	return (
		<div>
			{/* --------------------------------------------------------------------------------------------------------------------- */}
			<Grid container justify="center" alignItems="center">
				<Card className={classes.root}>
					<CardContent>
						{/* <Grid item alignItems="center"> */}
						<Typography className={classes.pistachioText}>
							Pistachios: {pistachios}
						</Typography>
						{/* </Grid> */}
					</CardContent>
				</Card>
			</Grid>
			<Grid
				container
				justify="space-around"
				spacing={6}
				alignItems="center"
				style={{ paddingTop: "0.5rem" }}
			>
				<Grid item xs={12} style={{ fontSize: "2rem" }}>
					<IconButton onClick={handleConfirm}>
						<Grid item xs={12}>
							{currentLoot != "" ? (
								<div>
									<AllInboxIcon
										style={{
											fontSize: "20rem",
											color: handleLootCrateColor(currentLoot),
										}}
									/>
									<Grid item>
										<Typography variant="h3" alignItems="center">
											{currentLoot}
										</Typography>
									</Grid>
								</div>
							) : (
								<Typography variant="h4">No crate selected.</Typography>
							)}
						</Grid>
					</IconButton>
					<Grid item xs={12}>
						{}
					</Grid>
				</Grid>
				<Grid item xs={6}>
					<Button
						onClick={handleShop}
						variant="contained"
						style={{
							backgroundColor: "green",
							color: "white",
							width: "9rem",
							height: "3rem",
							fontSize: "1.5rem",
						}}
					>
						Shop
					</Button>
				</Grid>
				{/* <Grid item xs={6}>
					<Button
						onClick={handleInventory}
						variant="contained"
						style={{
							backgroundColor: "green",
							color: "white",
							width: "10rem",
							height: "5rem",
							fontSize: "1.5rem",
						}}
					>
						Crates
					</Button>
				</Grid> */}

				{/* <Dialog
					onClose={handleInventory}
					open={inventory}
					justify="space-around"
					alignItems="center"
					style={{ textAlign: "center", overflowY: "hidden" }}
				>
					<Grid
						container
						style={{
							height: "24rem",
							overflowY: "scroll",
							scrollbarWidth: "none",
							msOverflowStyle: "none",
						}}
					>
						{lootCrates.map((crate) => {
							return (
								<Grid item xs={4}>
									<Grid item>
										<IconButton
											onClick={() => {
												setCurrentLoot(crate);
												console.log(lootCrates);
											}}
										>
											<AllInboxIcon
												style={{
													fontSize: "5rem",
													color: handleLootCrateColor(crate),
												}}
											/>
										</IconButton>
									</Grid>
									<Grid item>
										<Typography alignItems="center">{crate}</Typography>
									</Grid>
								</Grid>
							);
						})}
					</Grid>
				</Dialog> */}
				<Dialog
					onClose={handleShop}
					open={shop}
					justify="space-around"
					alignItems="center"
					style={{ textAlign: "center", overflowY: "hidden" }}
				>
					<Grid
						container
						style={{
							height: "18rem",
							overflowY: "scroll",
							scrollbarWidth: "none",
							msOverflowStyle: "none",
						}}
					>
						{shopCrates.map((crate) => {
							return (
								<Grid item xs={6}>
									<Grid item>
										<IconButton
											onClick={() => {
												// setLootCrates(lootCrates.concat(crate.name));
												if (currentLoot === "") {
													setCurrentLoot(crate.name);
													Cookies.set("Crate", crate.name);
													setShop(!shop);
												} else {
													setShop(!shop);
												}
											}}
										>
											<AllInboxIcon
												style={{
													fontSize: "5rem",
													color: handleLootCrateColor(crate.name),
												}}
											/>
										</IconButton>
									</Grid>
									<Grid item>
										<Typography alignItems="center">{crate.name}</Typography>
									</Grid>
								</Grid>
							);
						})}
					</Grid>
				</Dialog>
				<Dialog onClose={handleConfirm} open={confirm}>
					<Grid container>
						<Grid item style={{ padding: "2rem" }}>
							Are you sure you want to open {currentLoot}?
						</Grid>
						<DialogActions>
							<Button
								onClick={() => {
									handleConfirm();
									handleResult();
								}}
							>
								Yes
							</Button>
							<Button onClick={handleConfirm}>No</Button>
						</DialogActions>
					</Grid>
				</Dialog>
				<Dialog onClose={handleResult} open={result}>
					<Grid container style={{ padding: "2rem" }}>
						<Grid item>Congratulations, You receive {prize}.</Grid>
					</Grid>
				</Dialog>
			</Grid>

			{/* --------------------------------------------------------------------------------------------------------------------- */}

			{/* <Grid container justify="space-around" spacing={6} alignItems="center">
                <Grid item xs={12} style={{ fontSize: "2rem" }}>
                    <IconButton onClick={handleConfirm}>
                        <Grid item xs={12}>
                            <AllInboxIcon style={{ fontSize: "20rem", color: currentLoot.color }} />
                        </Grid>
                    </IconButton>
                    <Grid item xs={12}>
                        {currentLoot.name}
                    </Grid>
                </Grid>
                <Grid container item xs={12} style={{ height: "18rem", overflowY: "scroll", marginLeft: "1rem" }}>
                    {lootCrates.map((crate) => {
                        return (
                            <Grid item xs={4} >
                                <IconButton onClick={() => { setCurrentLoot({ color: crate.color, name: crate.name }) }}>

                                    <AllInboxIcon style={{ fontSize: "5rem", color: crate.color }} />
                                </IconButton>
                                <Grid item>
                                    {crate.name}
                                </Grid>
                            </Grid>
                        )
                    })}
                </Grid>
                <Dialog onClose={handleConfirm} open={confirm}>
                        <Grid container>
                            <Grid item style={{ padding: "2rem" }}>
                                Are you sure you want to open {currentLoot.name}?
                            </Grid>
                            <DialogActions>
                                <Button onClick={() => {
                                    handleConfirm()
                                    handleResult()
                                }} >
                                    Yes
                                    </Button>
                                <Button onClick={handleConfirm}>
                                    No
                                    </Button>
                            </DialogActions>

                        </Grid>
                    </Dialog>
                    <Dialog onClose={handleResult} open={result}>
                        <Grid container style={{ padding: "2rem" }}>
                            <Grid item>
                                Congratulations, you opened {currentLoot.name}! You receive nothing.
                            </Grid>
                        </Grid>
                    </Dialog>
            </Grid> */}

			{/* --------------------------------------------------------------------------------------------------------------------- */}
		</div>
	);
}
