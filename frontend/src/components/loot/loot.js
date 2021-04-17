import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import AllInboxIcon from '@material-ui/icons/AllInbox';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Modal from '@material-ui/core/Modal'

export default function Loot() {

    const lootCrates = [{ color: "grey", name: 'Common Crate' },
    { color: "blue", name: "Rare Crate" }, { color: "grey", name: 'Common Crate' },
    { color: "grey", name: 'Common Crate' }, { color: "purple", name: "Super Crate" },
    { color: "grey", name: 'Common Crate' }, { color: "blue", name: "Rare Crate" },
    { color: "blue", name: "Rare Crate" }, { color: "orange", name: "Ultra Crate" },
    { color: "purple", name: "Super Crate" }, { color: "grey", name: 'Common Crate' },
    { color: "grey", name: 'Common Crate' }, { color: "blue", name: "Rare Crate" },
    { color: "blue", name: "Rare Crate" }, { color: "orange", name: "Ultra Crate" },
    { color: "purple", name: "Super Crate" }]
    const shopCrates =[{ color: "grey", name: 'Common Crate' }, { color: "blue", name: "Rare Crate" }
    , { color: "purple", name: "Super Crate" }, { color: "orange", name: "Ultra Crate" }]
    const [currentLoot, setCurrentLoot] = useState(lootCrates[0])
    const [confirm, setConfirm] = useState(false)
    const [result, setResult] = useState(false)
    const [inventory, setInventory] = useState(false)
    const [shop, setShop] = useState(false)
    function handleConfirm() {
        setConfirm(!confirm)
    }
    function handleInventory() {
        setInventory(!inventory)
    }
    function handleShop() {
        setShop(!shop)
    }
    function handleResult() {
        setResult(!result)
    }

    return (
        <div>

            {/* --------------------------------------------------------------------------------------------------------------------- */}

            <Grid container justify="space-around" spacing={6} alignItems="center" style={{paddingTop: "3rem"}}>
                
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
                <Grid item xs={6}>
                    <Button onClick={handleShop} variant="contained" style={{ backgroundColor: "green", color: "white", width: "10rem", height: "5rem", fontSize: "1.5rem"}}>
                        Shop
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleInventory} variant="contained" style={{ backgroundColor: "green", color: "white", width: "10rem", height: "5rem", fontSize: "1.5rem"}}>
                        Crates
                    </Button>
                </Grid>

                <Dialog onClose={handleInventory} open={inventory} justify="space-around" alignItems="center" style={{ textAlign: "center", overflowY: "hidden" }}>
                    <Grid container style={{ height: "24rem", overflowY: "scroll", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                        {lootCrates.map((crate) => {
                            return (
                                <Grid item xs={4}>
                                    <Grid item>
                                        <IconButton onClick={() => { setCurrentLoot({ color: crate.color, name: crate.name }) }}>
                                            <AllInboxIcon style={{ fontSize: "5rem", color: crate.color }} />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <Typography alignItems="center">
                                            {crate.name}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Dialog>
                <Dialog onClose={handleShop} open={shop} justify="space-around" alignItems="center" style={{ textAlign: "center", overflowY: "hidden" }}>
                    <Grid container style={{ height: "18rem", overflowY: "scroll", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                        {shopCrates.map((crate) => {
                            return (
                                <Grid item xs={6}>
                                    <Grid item>
                                        <IconButton >
                                            <AllInboxIcon style={{ fontSize: "5rem", color: crate.color }} />
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <Typography alignItems="center">
                                            {crate.name}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Dialog>
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

        </div >
    )
}