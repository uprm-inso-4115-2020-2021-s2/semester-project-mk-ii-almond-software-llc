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
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => {
  return {
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
  };
});

export default function Social() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);

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
    <Fragment>
      <Grid container alignItems="center" justify="center" direction="row">
        <Container variant="h1" component="h1">
          Friends
        </Container>

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
        <Button className={classes.addFriendButton}>Add</Button>
      </Grid>

      <Container className={classes.gridLayout}>
        <Container className={classes.friendsComponent}>
          <List dense>
            {[0, 1, 2, 3].map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem key={value} button className={classes.friendsList}>
                  <ListItemAvatar>
                    <Avatar
                      alt={`Avatar n°${value + 1}`}
                      src={`/static/images/avatar/${value + 1}.jpg`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    id={labelId}
                    primary={`Line item ${value + 1}`}
                  />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(value)}
                      checked={checked.indexOf(value) !== -1}
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Container>

        <Container className={classes.buttonsContainer}>
          <Button className={classes.buttonsArrangement}>Battle</Button>
          <Button className={classes.buttonsArrangement}>Trade</Button>
          <Button className={classes.buttonsArrangement}>View Team</Button>
        </Container>
      </Container>
    </Fragment>
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
