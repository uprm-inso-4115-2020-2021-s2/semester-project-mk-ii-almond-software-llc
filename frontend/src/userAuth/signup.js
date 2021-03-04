import React, { useState, useEffect } from "react";
import Pistachio from "./pistachio.png";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
//import axios from "axios";
//import { Hidden } from "@material-ui/core";
//import Cookies from "js-cookie";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    backgroundColor: "green",
    borderRadius: "50%",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "green",
    "&:hover": {
      backgroundColor: "darkgreen",
    },
  },
  registerButton: {
    textDecoration: "none",
    color: "white",
    fontFamily: "Roboto",
    "&:hover": {
      color: "white",
      textDecoration: "none",
    },
  },
}));

export default function SignUp() {
  const classes = useStyles();

  let history = useHistory();

  // async function fetchData() {
  //   if (Cookies.get("user") !== "") {
  //     history.push("/");
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const verifyRegister = async () => {
  //   if (password === passwordConfirmation) {
  //     await axios
  //       .get(
  //         "https://almond-macademia-back-end.herokuapp.com/userExists?user=" +
  //           user
  //       )
  //       .then((res) => {
  //         if (!res.data) {
  //           axios.post(
  //             "https://almond-macademia-back-end.herokuapp.com/register?" +
  //               "user=" +
  //               user +
  //               "&password=" +
  //               password +
  //               "&fullName=" +
  //               fullName +
  //               "&departmentCode=" +
  //               departmentCode +
  //               "&studentNumber=" +
  //               studentNumber
  //           );
  //           history.push("/");
  //         }
  //       });
  //   }
  // };

  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [passwordConfirmation, setPasswordConfirmation] = useState();

  //const handleSubmit = (e)

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={Pistachio} className={classes.image} />
        <Typography component="h1" variant="h5">
          Register
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="password"
              variant="outlined"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="password confirmation"
              variant="outlined"
              required
              fullWidth
              label="Password confirmation"
              type="password"
              error={password !== passwordConfirmation}
              helperText={
                password !== passwordConfirmation
                  ? "Passwords do not match"
                  : ""
              }
              id="password-confirmation"
              onChange={(e) => {
                setPasswordConfirmation(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          // onClick={() => verifyRegister()}
        >
          <Typography>Register</Typography>
        </Button>

        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/">{"Already have an account? Login"}</Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
