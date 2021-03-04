import './App.css';
import React, { Component, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './components/tabs/tabPanel';
import a11yProps from './components/tabs/a11yProps';
import Social from './components/social/social';
import Main from './components/main/main';
import Battle from './components/battle/battle';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function App() {

  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Social" {...a11yProps(0)} />
          <Tab label="Main" {...a11yProps(1)} />
          <Tab label="Battle" {...a11yProps(2)} />
        </Tabs>
      </Paper>

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
  );
}
