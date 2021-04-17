import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Button } from "@material-ui/core";
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
    // borderStyle: "solid",
    maxWidth: "auto",
    [theme.breakpoints.between("300", "700")]: {
      fontSize: "14px",
    },
    [theme.breakpoints.between("710", "750")]: {
      fontSize: "18px",
    },
    [theme.breakpoints.between("768", "lg")]: {
      fontSize: "22px",
    },
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
      <Grid container item spacing={4} justify="space-around" alignItems="center">
        {monsterCollection.map((e, i) => {
          return (
            <Grid item xs={4} key={i}>
              <Grid container direction="column" alignItems="center" justify="center">
                <AccountCircleRoundedIcon style={{ fontSize: "5rem", color: 'green' }} />
                <Typography className={classes.names}>
                  {"Monster " + e}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
