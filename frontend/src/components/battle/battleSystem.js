import React from "react";
import { Typography, Grid, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    back: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: "green",
        "&:hover": {
            backgroundColor: "darkgreen",
        },
        alignSelf: 'start'
    },
}));

export default function BattleSystem(props) {

    const classes = useStyles();


    return (
        <div>
            <Grid
                container
                justify="flex-start"
                alignItems="center">
                <Button
                    className={classes.back}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        props.setMatching(!props.matching);
                    }}>
                    Back
                </Button>
            </Grid>
            <Grid
                container
                alignItems="center"
                justify="center"
                direction="row">
                <Typography variant="h2" component="h2">
                    Hello, I am Battle System Page.
                </Typography>
            </Grid>

        </div>
    );
}