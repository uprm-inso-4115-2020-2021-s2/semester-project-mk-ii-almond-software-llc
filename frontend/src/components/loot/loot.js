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

export default function Loot(props) {
	const classes = useStyles();
	// const [lootCrates, setLootCrates] = useState([]);
	const [shopCrates, setShopCrates] = useState([]);
	const [prize, setPrize] = useState();
	const normalCrateColor = "gray";
	const rareCrateColor = "blue";
	const epicCrateColor = "purple";
	const [currentLoot, setCurrentLoot] = useState(Cookies.get("Crate"));
	const [confirm, setConfirm] = useState(false);
	const [result, setResult] = useState(false);
	// const [inventory, setInventory] = useState(false);
	const [shop, setShop] = useState(false);
	const [pistachios, setPistachios] = useState();
	let [cratePrice, setCratePrice] = useState();
	// const [pay, setPay] = useState(false);

	const getLootCrates = async () => {
		await axios
			.get("https://almond-pistachio-back-end.herokuapp.com/api/lootboxes")
			.then((res) => {
				console.log(res.data);
				setShopCrates(res.data);
			});
	};

	const removePistachios = async () => {
		await axios
			.put(
				"https://almond-pistachio-back-end.herokuapp.com/api/player/addMoney/" +
					Cookies.get("user") +
					"/" +
					-cratePrice
			)
			.then((res) => {
				setPistachios(res.data.pistachios);
			});
	};

	const getPlayerPistachios = async () => {
		await axios
			.get(
				"https://almond-pistachio-back-end.herokuapp.com/api/player/" +
					Cookies.get("user")
			)
			.then((res) => {
				setPistachios(res.data.pistachios);
			});
	};

	const getLootPrize = async () => {
		await axios
			.get(
				"https://almond-pistachio-back-end.herokuapp.com/api/lootbox/open/" +
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

	const handleCratePrices = (currentLoot) => {
		if (currentLoot === "Normal Crate") {
			cratePrice = 1000;
		} else if (currentLoot === "Rare Crate") {
			cratePrice = 2500;
		} else if (currentLoot === "Epic Crate") {
			cratePrice = 5000;
		} else {
			cratePrice = 0;
		}
	};

	function handleConfirm() {
		setConfirm(!confirm);
	}
	// function handleInventory() {
	// 	setInventory(!inventory);
	// }
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
	}, []);

	useEffect(() => {
		getPlayerPistachios();
	}, [pistachios, prize, shop]);

	useEffect(() => {
		setCratePrice(0);
	}, [shop]);

	return (
		<div>
			<Grid
				container
				alignItems="center"
				justify="center"
				direction="column"
				style={{ justifyContent: "center", height: props.appHeight }}
			>
				{/* --------------------------------------------------------------------------------------------------------------------- */}
				<Grid item>
					<Button
						variant="contained"
						color="primary"
						style={{ backgroundColor: "#4A7562" }}
					>
						<Typography variant="h5" component="h5">
							Pistachios: {pistachios}
						</Typography>
					</Button>
				</Grid>
				<Grid
					item
					container
					justify="space-around"
					spacing={6}
					alignItems="center"
					style={{ paddingTop: "0.5rem" }}
				>
					<Grid item xs={12} style={{ fontSize: "2rem" }}>
						<IconButton onClick={handleConfirm}>
							<Grid item xs={12}>
								{currentLoot !== "" ? (
									<div>
										<AllInboxIcon
											style={{
												fontSize: "15rem",
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
						<Grid item xs={12} />
					</Grid>
					<Grid item xs={6}>
						<Button
							onClick={handleShop}
							variant="contained"
							style={{
								backgroundColor: "#4A7562",
								color: "white",
								width: "9rem",
								height: "3rem",
								fontSize: "1.5rem",
							}}
						>
							Shop
						</Button>
					</Grid>
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
													handleCratePrices(crate.name);
													if (currentLoot === "" && pistachios >= cratePrice) {
														setCurrentLoot(crate.name);
														Cookies.set("Crate", crate.name);
														removePistachios();
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
			</Grid>
		</div>
	);
}
