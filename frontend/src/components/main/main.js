import React, { Component, useState } from 'react';
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

export default function Main() {
    return (
        <div>
            <Grid
                container
                alignItems="center"
                justify="center"
                direction="row">
                <Typography variant="h1" component="h1">
                    Hello, I am Main Page.
            </Typography>
            </Grid>
        </div>
    )
}