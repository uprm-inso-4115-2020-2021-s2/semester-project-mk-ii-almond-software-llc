import { React, } from "react";
import { Typography, Grid } from "@material-ui/core";


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