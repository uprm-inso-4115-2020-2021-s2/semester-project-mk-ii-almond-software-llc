import React, { Component, useState } from 'react';
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import BattleSystem from './battleSystem';
import PublicIcon from '@material-ui/icons/Public';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    matchmaking: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "green",
        "&:hover": {
            backgroundColor: "darkgreen",
        },
    },
}));

export default function Battle() {

    const classes = useStyles();

    const [findingMatch, setFindingMatch] = useState(false);

    const toggleMatchmaking = () => {
        setFindingMatch(!findingMatch);
        console.log(findingMatch);
    }

    const queuePlayer = () => {

    }

    return (
        <Grid
            container
            alignItems="center"
            justify="center"
            direction="row">
            <Grid container
                alignItems="center"
                justify="center"
                direction="column">
                <Grid item>
                    <div style={{ backgroundColor: 'green', borderRadius: 100 }}>
                        <IconButton aria-label="search" color="primary" onClick={() => { toggleMatchmaking(); }}>
                            <PublicIcon style={{ fontSize: 75, color: 'white' }} />
                        </IconButton>
                    </div>
                </Grid>
                <Grid item>
                    <Button variant="contained" size="large" color="primary" className={classes.matchmaking} onClick={() => { toggleMatchmaking(); }}>
                        <Typography variant="h5" component="h5" style={{ color: 'white' }}>Matchmaking</Typography>
                    </Button>
                </Grid>
            </Grid>
            {findingMatch ? <div>
                <Grid item>
                    <BattleSystem />
                </Grid>
            </div> : <div>
                <Grid item >
                    <Typography variant="h2" component="h2">Hello, I am Battle Page.</Typography>
                </Grid>
            </div>}

        </Grid>
    );
}