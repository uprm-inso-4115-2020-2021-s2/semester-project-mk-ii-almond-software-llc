import React, { Component, useState } from 'react';
import { Typography, Grid, Button, IconButton, makeStyles } from "@material-ui/core";
import BattleSystem from './battleSystem';
import PublicIcon from '@material-ui/icons/Public';

const useStyles = makeStyles((theme) => ({
    matchmaking: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "green",
        "&:hover": {
            backgroundColor: "darkgreen",
        },
    },
}));

export default function Battle(props) {

    const classes = useStyles();

    const [matching, setMatching] = useState(false);

    const toggleMatchmaking = () => {
        setMatching(!matching);
        console.log(matching);
    }

    const queuePlayer = () => {

    }

    return (
        <div>
            {matching ? <div>
                <BattleSystem matching={matching} setMatching={setMatching} />
            </div> : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Grid
                    container
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
            </div>}
        </div>
    );
}