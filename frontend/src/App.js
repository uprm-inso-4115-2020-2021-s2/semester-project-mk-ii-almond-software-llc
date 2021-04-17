import './App.css';
import React, { Component, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentIcon from '@material-ui/icons/Assignment';
import HomeIcon from '@material-ui/icons/Home';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
import PeopleIcon from '@material-ui/icons/People';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './components/tabs/tabPanel';
import a11yProps from './components/tabs/a11yProps';
import Social from './components/social/social';
import Main from './components/main/main';
import Battle from './components/battle/battle';
import { Typography, Grid } from '@material-ui/core';
import useWindowDimensions from './components/windowDimensions/useWindowDimensions'
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import CachedIcon from "@material-ui/icons/Cached";
import Loot from './components/loot/loot';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rectangle: {
    width: "100%",
    top: "auto",
    bottom: 0,
    position: "fixed",
  },
  taskButton: {
    marginRight: theme.spacing(2),
  },
  logoutButton: {
    marginLeft: theme.spacing(2),
  },
  appBar: {
    top: "auto",
    bottom: 0,
  },
  names: {
    // borderStyle: "solid",
  },
  monsterNames: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: "green",
		"&:hover": {
			backgroundColor: "darkgreen",
		},
	},
  // icon: {
  //   position: "absolute",
  //   color: "black",
  //   fontSize: "2rem",
  //   marginTop: "-2rem",
  //   border: "solid black",
  //   borderRadius: "2rem",
  //   marginLeft:"76rem"
  // },
}));

export default function App() {
  const classes = useStyles();
  const { height, width } = useWindowDimensions();
  const [matched, setMatched] = useState(false);
  const [appHeight, setAppHeight] = useState(height);
  const [value, setValue] = useState(0);
  let history = useHistory();
  const monsterCollection = [1, 2, 3];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const logoutUser = () => {
    Cookies.set("user", "")
    history.push("/");
  }

  return (
    <div className="App">
      <div
        className={classes.root}
        ref={(e) => {
          if (!e) return;
          setAppHeight(height - e.getBoundingClientRect().height);
          console.log(appHeight);
        }}
      >
        <AppBar
          position="static"
          elevation={3}
          style={{ backgroundColor: "green" }}
        >
          <Toolbar variant="dense" style={{ justifyContent: "center" }}>
            {/* <IconButton
              edge="start"
              className={classes.taskButton}
              color="inherit"
              aria-label="menu"
            >
              <AssignmentIcon fontSize="small" />
            </IconButton> */}
            <Tabs value={value} onChange={handleChange}>
              <Tab
                icon={<PeopleIcon fontSize="small" />}
                label="Social"
                disabled={matched}
                {...a11yProps(0)}
              />
              <Tab
                icon={<HomeIcon fontSize="small" />}
                label="Main"
                disabled={matched}
                {...a11yProps(1)}
              />
              <Tab
                icon={<SportsKabaddiIcon fontSize="small" />}
                label="Battle"
                disabled={matched}
                {...a11yProps(2)}
              />
            </Tabs>
            <IconButton
              edge="end"
              className={classes.logoutButton}
              color="inherit"
              aria-label="menu"
              onClick={() => {
                logoutUser();
              }}
            >
              <ExitToAppIcon fontSize="small" />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>

      <div style={{ height: 0.85 * appHeight, overflowY: "scroll" }}>
        <TabPanel value={value} index={0}>
          <Social />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Main />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Battle appHeight={0.85 * appHeight - 0.15 * appHeight} matched={matched} setMatched={setMatched} />
        </TabPanel>
      </div>

      <div>
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="row"
            style={{ height: 0.15 * appHeight, background: "green" }}
          >
            <Grid container item xs={12} spacing={3}>
              {monsterCollection.map((e, i) => {
                return (
                  <Grid item xs={4} key={i}>
                    <AccountCircleRoundedIcon style={{ fontSize: "2.5rem" }} />
                    <Typography className={classes.names}>
                      {"Monster " + e}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
            {/* <CachedIcon className={classes.icon}/> */}
          </Grid>
        </AppBar>
      </div>
    </div>
  );
}