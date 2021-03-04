import React from "react";
import { Typography, Grid } from "@material-ui/core";

export default function BattleSystem(){
    return(
        <Grid 
            container
            alignItems="center"
            justify="center"
            direction="row">
             <Typography variant="h1" component="h1">
                Hello, I am Battle System Page.
            </Typography>
        </Grid>
    );
}