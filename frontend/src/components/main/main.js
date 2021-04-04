import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";

const useStyles = makeStyles((theme) => ({
  main: {
    fontSize: "3rem",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
  names: {
    borderStyle: "solid",
    maxWidth: "auto",
    //marginLeft: "9rem",
    // [theme.breakpoints.between("300", "700")]: {
    //   marginLeft: "1rem",
    // },
    // [theme.breakpoints.between("710", "750")]: {
    //   marginLeft: "2rem",
    // },
    // [theme.breakpoints.between("768", "lg")]: {
    //   marginLeft: "5rem",
    // },
  },
}));

export default function Main() {
  const classes = useStyles();
  //const [monsterCollection, setMonsterCollection] = useState([]);
  const monsterCollection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  // const getMonsterList = async () => {
  //   await axios
  //     .get(
  //       "http://localhost:8080/api/player/friendList?user=" +
  //         Cookies.get("user")
  //     )
  //     .then((res) => {
  //       setMonsterCollection(res.data);
  //     });
  // };

  return (
    <div className={classes.root}>
      <Grid container alignItems="center" justify="center" spacing={1}>
        <Typography align="center" className={classes.main}>
          Main
        </Typography>
        <Grid container item xs={12} spacing={3}>
          {monsterCollection.map((i) => {
            return (
              <Grid item xs={4} alignItems="center" justify="center">
                <AccountCircleRoundedIcon style={{ fontSize: "4rem" }} />
                <Typography className={classes.names}>
                  {"monster " + monsterCollection[i]}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}
