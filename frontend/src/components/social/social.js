import React, { Fragment } from "react";
import {
  Typography,
  Grid,
  Container,
  TextField,
  List,
  ListItem,
  Avatar,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Checkbox,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles((theme) => ({
  add: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "green",
    "&:hover": {
      backgroundColor: "darkgreen",
    },
  },
  searchBox: {
    width: "20rem",
    justifyContent: "center",
    [theme.breakpoints.between("300", "700")]: {
      width: "10rem",
    },
    [theme.breakpoints.between("710", "750")]: {
      width: "15rem",
    },
    [theme.breakpoints.between("770", "xl")]: {
      width: "20rem",
    },
  },
  addFriendButton: {
    display: "inline",
    border: "2px solid black",
    backgroundColor: "#f2f2f2",
    marginLeft: "2rem",
  },
  friendsComponent: {
    width: "50%",
    display: "table-cell",
  },
  friendsList: {
    marginTop: "1rem",
    marginLeft: "20rem",
    [theme.breakpoints.between("300", "700")]: {
      marginLeft: "-2rem",
      width: "auto",
    },
    [theme.breakpoints.between("710", "750")]: {
      marginLeft: "2rem",
      width: "auto",
    },
    [theme.breakpoints.between("770", "xl")]: {
      marginLeft: "20rem",
      width: "auto",
    },
  },
  buttonsContainer: {
    paddingLeft: "3rem",
  },
  buttonsArrangement: {
    display: "block",
    display: "table-cell",
    border: "2px solid black",
    backgroundColor: "#f2f2f2",
    marginTop: "2rem",

    [theme.breakpoints.between("xs", "700")]: {
      marginLeft: "-2rem",
      width: "auto",
    },
    [theme.breakpoints.up("710")]: {
      marginLeft: "2rem",
      width: "auto",
    },
  },
  gridLayout: {
    display: "table",
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
  },
}));

export default function Social() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);
  const [anchor, setAnchor] = React.useState(null);
  const [current, setCurrent] = React.useState(null);

  const openMenu = (event, value) => {
    setAnchor(event.currentTarget);
    setCurrent(value);
  };

  const closeMenu = () => {
    setAnchor(null);
  };

  const clickBattle = () => {
    setAnchor(null);
    console.log("battle selected", current);
  }

  const clickTrade = () => {
    setAnchor(null);
    console.log("trade selected", current);
  }

  const clickViewTeam = () => {
    setAnchor(null);
    console.log("view team selected", current);
  }

  const addFriend = () => {
    
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div>
      <Grid container alignContent="center" justify="center" direction="column">
        {/* <Grid container alignItems="center" justify="center" direction="column" style={{}}> */}
        <Grid container alignItems="center" justify="center" direction="row">
          <Grid item>
            <Autocomplete
              className={classes.searchBox}
              freeSolo
              id="search-bar"
              disableClearable
              options={players.map((option) => option.playerName)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search"
                  margin="normal"
                  variant="outlined"
                  InputProps={{ ...params.InputProps, type: "search" }}
                />
              )}
            />
          </Grid>
          <Grid item style={{ padding: '10px' }}>
            <Button className={classes.add} color="primary" variant="contained">Add</Button>
          </Grid>
        </Grid>
        {/* </Grid> */}

        {/* <Container className={classes.gridLayout}> */}
        {/* <Container className={classes.friendsComponent}> */}
        <Grid item alignItems="center" justify="center">
          <List>
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem
                  key={value}
                // className={classes.friendsList}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${value + 1}`}
                      src={`/static/images/avatar/${value}.jpg`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    id={labelId}
                    primary={`Line item ${value}`}
                    secondary={"Testing"}
                  />
                  {/* <Typography variant="h4">
                    {`Line item ${value + 1}`}
                  </Typography> */}
                  <ListItemSecondaryAction>
                    {/* <Checkbox
                        edge="end"
                        onChange={handleToggle(value)}
                        checked={checked.indexOf(value) !== -1}
                        inputProps={{ "aria-labelledby": labelId }}
                      /> */}
                    <IconButton edge="end" aria-label="more" onClick={(e) => {openMenu(e, value)}}>
                      <MoreHorizIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        {/* </Container> */}

        {/* <Container className={classes.buttonsContainer}>
            <Button className={classes.buttonsArrangement}>Battle</Button>
            <Button className={classes.buttonsArrangement}>Trade</Button>
            <Button className={classes.buttonsArrangement}>View Team</Button>
          </Container> */}
        {/* </Container> */}
      </Grid>
      <Menu
        id="simple-menu"
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={closeMenu}
      >
        <MenuItem onClick={clickBattle}>Battle</MenuItem>
        <MenuItem onClick={clickTrade}>Trade</MenuItem>
        <MenuItem onClick={clickViewTeam}>View Team</MenuItem>
      </Menu>
    </div >
  );
}

const players = [
  { playerName: "The Shawshank Redemption" },
  { playerName: "The Godfather" },
  { playerName: "The Godfather: Part II" },
  { playerName: "The Dark Knight" },
  { playerName: "12 Angry Men" },
  { playerName: "Schindler's List" },
  { playerName: "Pulp Fiction" },
  { playerName: "The Lord of the Rings: The Return of the King" },
  { playerName: "The Good, the Bad and the Ugly" },
  { playerName: "Fight Club" },
  { playerName: "The Lord of the Rings: The Fellowship of the Ring" },
  { playerName: "Star Wars: Episode V - The Empire Strikes Back" },
  { playerName: "Forrest Gump" },
];
