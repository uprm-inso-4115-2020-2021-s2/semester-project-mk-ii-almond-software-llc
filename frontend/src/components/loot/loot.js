import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Modal from "@material-ui/core/Modal";
import axios from "axios";
import Cookies from "js-cookie";

export default function Loot() {
	const [lootCrates, setLootCrates] = useState([]);
	const [shopCrates, setShopCrates] = useState([]);
	const [prize, setPrize] = useState();
	const normalCrateColor = "grey";
	const rareCrateColor = "blue";
	const epicCrateColor = "purple";
	const [currentLoot, setCurrentLoot] = useState("");
	const [confirm, setConfirm] = useState(false);
	const [result, setResult] = useState(false);
	const [inventory, setInventory] = useState(false);
	const [shop, setShop] = useState(false);

	const getLootCrates = async () => {
		await axios.get("http://localhost:8080/api/lootboxes").then((res) => {
			console.log(res.data);
			setShopCrates(res.data);
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

	const handleLootCrateColor = () => {
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

	const removeCrate = (event) => {};

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
		setResult(!result);
	}

	useEffect(() => {
		getLootCrates();
	}, []);

	return (
		<div>
			{/* --------------------------------------------------------------------------------------------------------------------- */}

			<Grid
				container
				justify="space-around"
				spacing={6}
				alignItems="center"
				style={{ paddingTop: "3rem" }}
			>
				<Grid item xs={12} style={{ fontSize: "2rem" }}>
					<IconButton onClick={handleConfirm}>
						<Grid item xs={12}>
							{currentLoot != "" ? (
								<AllInboxIcon
									style={{
										fontSize: "20rem",
										color: handleLootCrateColor(),
									}}
								/>
							) : (
								<Typography>No crate selected.</Typography>
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
							width: "10rem",
							height: "5rem",
							fontSize: "1.5rem",
						}}
					>
						Shop
					</Button>
				</Grid>
				<Grid item xs={6}>
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
				</Grid>

				<Dialog
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
												console.log(currentLoot);
											}}
										>
											<AllInboxIcon style={{ fontSize: "5rem" }} />
										</IconButton>
									</Grid>
									<Grid item>
										<Typography alignItems="center">{crate}</Typography>
									</Grid>
								</Grid>
							);
						})}
					</Grid>
				</Dialog>
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
												setLootCrates(lootCrates.concat("Epic Crate"));
												console.log(lootCrates);
											}}
										>
											<AllInboxIcon style={{ fontSize: "5rem" }} />
										</IconButton>
									</Grid>
									<Grid item>
										<Typography alignItems="center">{}</Typography>
									</Grid>
								</Grid>
							);
						})}
					</Grid>
				</Dialog>
				<Dialog onClose={handleConfirm} open={confirm}>
					<Grid container>
						<Grid item style={{ padding: "2rem" }}>
							Are you sure you want to open {}?
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
						<Grid item>
							Congratulations, you opened {currentLoot}! You receive {prize}.
						</Grid>
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
