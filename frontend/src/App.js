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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  rectangle: {
    width: '100%',
    top: 'auto',
    bottom: 0,
    position: 'fixed',
  },
  taskButton: {
    marginRight: theme.spacing(2),
  },
  logoutButton: {
    marginLeft: theme.spacing(2),
  },
}));

export default function App() {
  const classes = useStyles();
  const { height, width } = useWindowDimensions();
  const [value, setValue] = useState(0);
  let history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const logoutUser = () => {
    Cookies.set("user", "")
    history.push("/login");
  }

  return (
    <div className="App">
      <div className={classes.root}>
        <AppBar position='static'>
          <Toolbar variant='dense' style={{ justifyContent: 'space-between' }}>
            <IconButton edge="start" className={classes.taskButton} color="inherit" aria-label="menu">
              <AssignmentIcon fontSize="small" />
            </IconButton>
            <Tabs value={value} onChange={handleChange} >
              <Tab icon={<PeopleIcon fontSize="small" />} label="Social" {...a11yProps(0)} />
              <Tab icon={<HomeIcon fontSize="small" />} label="Main" {...a11yProps(1)} />
              <Tab icon={<SportsKabaddiIcon fontSize="small" />} label="Battle" {...a11yProps(2)} />
            </Tabs>
            <IconButton edge="end" className={classes.logoutButton} color="inherit" aria-label="menu">
              <ExitToAppIcon
                fontSize="small"
                onClick={() => {
                  logoutUser();
                }}
              />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>

      <div style={{ height: 0.75 * height, overflowY: 'scroll' }}>
        <TabPanel value={value} index={0}>
          <Social />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Main />
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Battle />
        </TabPanel>
      </div>

      <Paper>
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="row"
          className={classes.rectangle}
          style={{ height: 0.15 * height, background: 'black' }}
        >
          <Typography style={{ color: 'white' }} variant="h4" component="h4">Hello, I am Team Bar.</Typography>
        </Grid>
      </Paper>


    </div >
  );
}