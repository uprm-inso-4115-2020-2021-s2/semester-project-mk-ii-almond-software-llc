import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

export default function Loot() {

    // const lootCrates = [{ color: "grey", name: 'Common Crate' },
    // { color: "blue", name: "Rare Crate" }, { color: "grey", name: 'Common Crate' },
    // { color: "grey", name: 'Common Crate' }, { color: "purple", name: "Super Crate" },
    // { color: "grey", name: 'Common Crate' }, { color: "blue", name: "Rare Crate" },
    // { color: "blue", name: "Rare Crate" }, { color: "orange", name: "Ultra Crate" },
    // { color: "purple", name: "Super Crate" }, { color: "grey", name: 'Common Crate' },
    // { color: "grey", name: 'Common Crate' }, { color: "blue", name: "Rare Crate" },
    // { color: "blue", name: "Rare Crate" }, { color: "orange", name: "Ultra Crate" },
    // { color: "purple", name: "Super Crate" }]
    // const shopCrates = [{ color: "grey", name: 'Common Crate' }, { color: "blue", name: "Rare Crate" }
    //     , { color: "purple", name: "Super Crate" }, { color: "orange", name: "Ultra Crate" }]
    // const [currentLoot, setCurrentLoot] = useState(lootCrates[0])
    // const [inventory, setInventory] = useState(false)
    // const [shop, setShop] = useState(false)

    // function handleInventory() {
    //     setInventory(!inventory)
    // }
    // function handleShop() {
    //     setShop(!shop)
    // }


    const tasks = [{ content: "Win 1 battle.", have: 15, need: 1 },
    { content: "Win 5 battles.", have: 15, need: 5 },
    { content: "Win 15 battles.", have: 15, need: 15 }]
    const [reward, setReward] = useState(0)
    const [option1, setOption1] = useState(false)
    const [option2, setOption2] = useState(false)
    const [single, setSingle] = useState(false)
    const [multi, setMulti] = useState(false)
    function handleReward() {
        setReward(reward + 1)
    }
    function handleOption1() {
        setOption1(!option1)
    }
    function handleOption2() {
        setOption2(!option2)
    }
    function handleSingle() {
        setSingle(!single)
    }
    function handleMulti() {
        setMulti(!multi)
    }

    return (
        <div>

            {/* --------------------------------------------------------------------------------------------------------------------- */}

            <Grid container justify="space-around" spacing={6} alignItems="center" style={{ paddingTop: "1rem" }}>

                <Grid container item xs={12} justify="center">
                    <Grid item xs={12} sm={8} md={6} lg={4}>
                        <Card>
                            <CardHeader title="Daily Tasks" style={{ color: "white", backgroundColor: "green" }} />
                            <CardContent>
                                <List>
                                    {tasks.map((task, index) => {
                                        return (
                                            <div>
                                                <ListItem style={{ color: task.have >= task.need ? "green" : "grey" }}>
                                                    <ListItemAvatar>
                                                        {task.have >= task.need ?
                                                            <CheckCircleOutlineIcon />
                                                            : <RemoveCircleOutlineIcon />}
                                                    </ListItemAvatar>
                                                    <ListItemText primary={task.content} />
                                                    <ListItemSecondaryAction>
                                                        <Typography>
                                                            {task.have}/{task.need}
                                                        </Typography>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                                {index != tasks.length - 1 && <Divider variant="inset" component="li" />}
                                            </div>
                                        )
                                    })}
                                </List>
                                {tasks.some(task => task.have < task.need) ? "" :
                                    <Button variant="contained" style={{ color: "white", backgroundColor: "green" }}>
                                        Click to obtain daily rewards
                                    </Button>
                                }

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Grid container item xs={12} justify="center">
                    <Grid container item xs={12} sm={8} md={6} lg={4}  spacing={2} justify="center">
                        <Grid item xs={12} md={6}>
                            <Button onClick={handleOption1}>
                                <Card variant="outlined" square style={{ height: "16rem", width: "15rem" }}>
                                    <Grid container style={{ height: "100%" }}>
                                        <Grid item xs={12} style={{ height: "70%" }}>
                                            <AllInboxIcon style={{ fontSize: "10rem" }} />
                                        </Grid>
                                        <Grid item xs={12} style={{ height: "10%", backgroundColor: "lightgrey" }}>
                                            <Typography>
                                                1000 pt
                                        </Typography>
                                        </Grid>
                                        <Grid item xs={12} style={{ height: "20%", color: "white", backgroundColor: "green" }}>
                                            <Typography style={{ fontSize: "1.5rem"}}>
                                                1 Crate
                                        </Typography>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button onClick={handleOption2}>
                                <Card variant="outlined" square style={{ height: "16rem" }}>
                                    <Grid container style={{ height: "100%" , width: "15rem"}}>
                                        <Grid item xs={12} style={{ height: "70%" }}>
                                            <AllInboxIcon style={{ fontSize: "10rem" }} />
                                        </Grid>
                                        <Grid item xs={12} style={{ height: "10%", backgroundColor: "lightgrey" }}>
                                            <Typography>
                                                10000 pt
                                        </Typography>
                                        </Grid>
                                        <Grid item xs={12} style={{ height: "20%", color: "white", backgroundColor: "green" }}>
                                            <Typography style={{ fontSize: "1.5rem"}}>
                                                10(+1) Crates
                                        </Typography>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>

                <Dialog onClose={handleOption1} open={option1}>
                    <Grid container>
                        <Grid item style={{ padding: "2rem" }}>
                            Are you sure you want spend 1000 ptch to open a crate?
                            </Grid>
                        <DialogActions>
                            <Button onClick={() => {
                                handleOption1()
                                handleSingle()
                            }} >
                                Yes
                                    </Button>
                            <Button onClick={handleOption1}>
                                No
                                    </Button>
                        </DialogActions>

                    </Grid>
                </Dialog>
                <Dialog onClose={handleOption2} open={option2}>
                    <Grid container>
                        <Grid item style={{ padding: "2rem" }}>
                            Are you sure you want spend 10000 pt to open 11 crates?
                            </Grid>
                        <DialogActions>
                            <Button onClick={() => {
                                handleOption2()
                                handleMulti()
                            }} >
                                Yes
                                    </Button>
                            <Button onClick={handleOption2}>
                                No
                                    </Button>
                        </DialogActions>

                    </Grid>
                </Dialog>
                <Dialog onClose={handleSingle} open={single}>
                    <Grid container style={{ padding: "2rem" }}>
                        <Grid item>
                            Congratulations, you opened a crate! You receive nothing.
                            </Grid>
                    </Grid>
                </Dialog>
                <Dialog onClose={handleMulti} open={multi}>
                    <Grid container style={{ padding: "2rem" }}>
                        <Grid item>
                            Congratulations, you opened 11 crates! You receive nothing.
                            </Grid>
                    </Grid>
                </Dialog>

                {/* <Grid item xs={6}>
                    <Button onClick={handleShop} variant="contained" style={{ backgroundColor: "green", color: "white", width: "10rem", height: "5rem", fontSize: "1.5rem" }}>
                        Shop
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleInventory} variant="contained" style={{ backgroundColor: "green", color: "white", width: "10rem", height: "5rem", fontSize: "1.5rem" }}>
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
                */}
            </Grid>



            {/* --------------------------------------------------------------------------------------------------------------------- */}

        </div >
    )
}