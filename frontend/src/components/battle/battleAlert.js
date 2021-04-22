import { React, useState } from "react";
import { Typography, Grid, Button, makeStyles, CircularProgress } from "@material-ui/core";
import SockJsClient from 'react-stomp';
import AndroidIcon from "@material-ui/icons/Android";
import AppleIcon from "@material-ui/icons/Apple";
import BattleMenu from './battleMenu';
import Cookies from "js-cookie";
import axios from "axios";

export default function BattleAlert(props) {

    return (
        <div>
            <Grid item container direction="column" justify="center" alignItems="center">
                {props.messages.map((e, i) => {
                    return (
                        <div key={i}>
                            {e.server ?
                                <Grid item style={{ padding: '10px', fontStyle: 'italic' }} key={i}>
                                    <Typography>{e.content}</Typography>
                                </Grid>
                                :
                                <Grid item style={{ padding: '10px' }} key={i}>
                                    <Typography>{e.username}: {e.content}</Typography>
                                </Grid>}
                        </div>
                    )
                })}
            </Grid>
        </div>
    );

}