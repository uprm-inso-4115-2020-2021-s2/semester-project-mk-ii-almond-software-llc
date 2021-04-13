import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import AllInboxIcon from '@material-ui/icons/AllInbox';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

export default function Loot() {

    const lootCrates = [{ color: "grey", name: 'Common Crate' },
    { color: "blue", name: "Rare Crate" }, { color: "grey", name: 'Common Crate' },
    { color: "grey", name: 'Common Crate' }, { color: "purple", name: "Super Crate" },
    { color: "grey", name: 'Common Crate' }, { color: "blue", name: "Rare Crate" },
    { color: "blue", name: "Rare Crate" }, { color: "orange", name: "Ultra Crate" },
    { color: "purple", name: "Super Crate" }, { color: "grey", name: 'Common Crate' }]
    const [currentLoot, setCurrentLoot] = useState(lootCrates[0])
    const [confirm, setConfirm] = useState(false)
    const [result, setResult] = useState(false)
    function handleConfirm() {
        setConfirm(!confirm)
    }
    function handleResult() {
        setResult(!result)
    }

    return (
        <div>
            <Grid container justify="space-around" spacing={6} alignItems="center">
                <Grid item xs={12} style={{ fontSize: "2rem" }}>
                    <IconButton onClick={handleConfirm}>
                        <Grid item xs={12}>
                            <AllInboxIcon style={{ fontSize: "20rem", color: currentLoot.color }} />
                        </Grid>
                    </IconButton>
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
            </Grid>


        </div >
    )
}