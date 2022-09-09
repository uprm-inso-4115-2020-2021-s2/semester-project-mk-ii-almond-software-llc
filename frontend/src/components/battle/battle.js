import React, { useState, useEffect } from "react";
import { Typography, Grid, Button, IconButton, makeStyles } from "@material-ui/core";
import BattleSystem from "./battleSystem";
import PublicIcon from "@material-ui/icons/Public";
import Cookies from "js-cookie";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  matchmaking: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#4A7562",
    "&:hover": {
      backgroundColor: "darkgray",
    },
  },
}));

export default function Battle(props) {
  const classes = useStyles();
  // const [matched, setMatched] = useState(false);
  const player = Cookies.get("user");
  const [battleID, setBattleID] = useState("");
  const [battleReady, setBattleReady] = useState();
  const [callDelete, setCallDelete] = useState(false);

  useEffect(() => {
    deleteBattle();
  }, [callDelete])

  const queuePlayer = async () => {
    await axios
      .put("https://almond-pistachio-back-end.herokuapp.com/api/battle/queue?player=" + player)
      .then((res) => {
        console.log(res.data);
        console.log(res.data.secondPlayerID === "");
        axios({
          method: "put",
          url: "https://almond-pistachio-back-end.herokuapp.com/api/player/" + player + "/" + res.data.battleID,
        });
        setBattleID(res.data.battleID);
        setBattleReady(res.data.secondPlayerID !== "");
        props.setMatched(!props.matched);
      });
  };

  const deleteBattle = async () => {
    if (battleID !== "") {
      await axios.delete(
        "https://almond-pistachio-back-end.herokuapp.com/api/battle/" + battleID
      ).then(() => {
        console.log("delete success");
        setCallDelete(false)
      });
    };
  };

  return (
    <div>
      {props.matched ? (
        <div>
          <BattleSystem
            matched={props.matched}
            setMatched={props.setMatched}
            player={player}
            battleID={battleID}
            battleReady={battleReady}
            appHeight={props.appHeight}
            appWidth={props.appWidth}
            callDelete={callDelete}
            setCallDelete={setCallDelete}
          />
        </div>
      ) : (
        <div>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
            style={{ justifyContent: "center", height: props.appHeight }}
          >
            <Grid item>
              <div style={{ backgroundColor: "gray", borderRadius: 100 }}>
                <IconButton
                  aria-label="search"
                  color="primary"
                  onClick={() => {
                    queuePlayer();
                  }}
                >
                  <PublicIcon style={{ fontSize: 75, color: "white" }} />
                </IconButton>
              </div>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                color="primary"
                className={classes.matchmaking}
                onClick={() => {
                  queuePlayer();
                }}
              >
                <Typography variant="h5" component="h5">
                  Matchmaking
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}
