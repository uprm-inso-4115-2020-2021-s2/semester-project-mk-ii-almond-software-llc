import { React, useState } from "react";
import { Typography, Grid, makeStyles, Button, Paper, CircularProgress } from "@material-ui/core";
import AndroidIcon from "@material-ui/icons/Android";
import AppleIcon from "@material-ui/icons/Apple";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  backButton: {
    fontSize: "2rem",
  },
  progress: {
    background: "grey",
    borderRadius: "1rem",
    width: "15rem",
    margin: theme.spacing(2),
    marginLeft: "10rem",

    [theme.breakpoints.between("300", "700")]: {
      width: "10rem",
      marginLeft: 0,
    },
    [theme.breakpoints.between("768", "810")]: {
      marginLeft: "3rem",
    },
  },
  progressBar: {
    borderRadius: "1rem",
    backgroundColor: "orange",
    width: "50%",

    [theme.breakpoints.between("300", "700")]: {
      marginLeft: 0,
      width: "50%",
    },
  },
  monsterIcon: {
    fontSize: "4rem",
  },
  buttonMenu: {
    backgroundColor: "#f2f2f2",
  },
  buttonMenuButtons: {
    backgroundColor: "white"
  },
}));

export default function BattleMenu(props) {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.showMenu ? <Grid container spacing={4} className={classes.buttonMenu}>
        <Grid item xs={6}>
          <Button className={classes.buttonMenuButtons} onClick={props.toggleMoves}>Moves</Button>
        </Grid>
        <Grid item xs={6}>
          <Button className={classes.buttonMenuButtons} onClick={props.toggleTeam}>Team</Button>
        </Grid>
        <Grid item xs={12}>
          <Button className={classes.buttonMenuButtons} onClick={props.leaveRoom}>Forfeit</Button>
        </Grid>
      </Grid> : <div />}

      {props.showMoves ? <Grid container spacing={4} className={classes.buttonMenu}>
        <Grid item xs={6}>
          <Button disabled={props.lockMenu} className={classes.buttonMenuButtons} onClick={props.toggleMenu}>Back</Button>
        </Grid>
        {props.playerMoves.map((e, i) => {
          return (
            <Grid item xs={6} key={i}>
              <Button className={classes.buttonMenuButtons}
                onClick={() => {
                  props.sendMove(i);
                  props.setLockMenu(false);
                }}>
                {e.name}
              </Button>
              <Typography>Base Damage: {e.baseDamage}</Typography>
            </Grid>
          )
        })}
      </Grid> : <div />}

      {props.showTeam ? <Grid container spacing={4} className={classes.buttonMenu}>
        <Grid item xs={6}>
          <Button disabled={props.lockMenu} className={classes.buttonMenuButtons} onClick={props.toggleMenu}>Back</Button>
        </Grid>
        {props.playerTeam.map((e, i) => {
          return (
            <Grid item xs={6} key={i}>
              <Button disabled={props.monster.name === e.name} className={classes.buttonMenuButtons}
                onClick={() => {
                  props.sendSwap(i);
                  props.setLockMenu(false);
                }}>
                {e.name}
              </Button>
              <Typography>Current HP: {(e.stats.hp / e.stats.maxHp) * 100}</Typography>
            </Grid>
          )
        })}
      </Grid> : <div />}

      {props.showIdle ? <Grid container spacing={4} className={classes.buttonMenu}>
        <Grid item container justify="center" alignItems="center" direction="row">
          <CircularProgress />
        </Grid>
      </Grid> : <div />}
    </div>
  );
}
