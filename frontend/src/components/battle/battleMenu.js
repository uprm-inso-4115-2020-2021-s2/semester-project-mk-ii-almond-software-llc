import { React, useState } from "react";
import { Typography, Grid, makeStyles, Button, Paper } from "@material-ui/core";
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
  const [showMenu, setShowMenu] = useState(true);
  const [showMoves, setShowMoves] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const [battle, setBattle] = useState(props.battle);
  const [player, setPlayer] = useState(props.player);
  const [playerMonster, setPlayerMonster] = useState(player === battle.firstPlayerID ? battle.activeMonster1 : battle.activeMonster2);
  const [playerMoves, setPlayerMoves] = useState(player === battle.firstPlayerID ? battle.activeMonster1.moves : battle.activeMonster2.moves)
  const [playerTeam, setPlayerTeam] = useState(player === battle.firstPlayerID ? battle.firstPlayerTeam : battle.secondPlayerTeam)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
    setShowMoves(false)
    setShowTeam(false)
  }

  const toggleMoves = () => {
    console.log(playerMoves, playerTeam)
    setShowMenu(false)
    setShowMoves(!showMoves)
    setShowTeam(false)
  }

  const toggleTeam = () => {
    setShowMenu(false)
    setShowMoves(false)
    setShowTeam(!showTeam)
  }

  return (
    <div className={classes.root}>

      {showMenu ? <Grid container spacing={4} className={classes.buttonMenu}>
        <Grid item xs={6}>
          <Button className={classes.buttonMenuButtons} onClick={toggleMoves}>Moves</Button>
        </Grid>
        <Grid item xs={6}>
          <Button className={classes.buttonMenuButtons} onClick={toggleTeam}>Team</Button>
        </Grid>
        <Grid item xs={12}>
          <Button className={classes.buttonMenuButtons} onClick={props.leaveRoom}>Forfeit</Button>
        </Grid>
      </Grid> : <div />}

      {showMoves ? <Grid container spacing={4} className={classes.buttonMenu}>
        <Grid item xs={6}>
          <Button className={classes.buttonMenuButtons} onClick={toggleMenu}>Back</Button>
        </Grid>
        {playerMoves.map((e, i) => {
          return (
            <Grid item xs={6} key={i}>
              <Button className={classes.buttonMenuButtons}>{e.name}</Button>
              <Typography>Base Damage: {e.baseDamage}</Typography>
            </Grid>
          )
        })}
      </Grid> : <div />}

      {showTeam ? <Grid container spacing={4} className={classes.buttonMenu}>
        <Grid item xs={6}>
          <Button className={classes.buttonMenuButtons} onClick={toggleMenu}>Back</Button>
        </Grid>
        {playerTeam.map((e, i) => {
          return (
            <Grid item xs={6} key={i}>
              <Button className={classes.buttonMenuButtons}>{e.name}</Button>
              <Typography>Current HP: {(e.stats.hp / e.stats.maxHp) * 100}</Typography>
            </Grid>
          )
        })}
      </Grid> : <div />}
    </div>
  );
}
