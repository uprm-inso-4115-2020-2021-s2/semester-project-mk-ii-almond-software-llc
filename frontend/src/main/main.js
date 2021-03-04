import React, { Component } from 'react';
import { Typography, Grid } from "@material-ui/core";

export default function Main(){
    return(
        <Grid 
            container
            alignItems="center"
            justify="center"
            direction="row">
             <Typography variant="h1" component="h1">
                Hello, I am Main Page.
            </Typography>
        </Grid>
    )
}