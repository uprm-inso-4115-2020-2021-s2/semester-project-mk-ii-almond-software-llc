import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Signup from './signup/signup';
import Login from './login/login';
=======
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
<<<<<<< HEAD:frontend/src/App.js
import Signup from './signup/signup';
import Login from './login/login';
=======
import Signup from './userAuth/signup';
import Login from './userAuth/login';
>>>>>>> 1aa694d... login and signup finally done:frontend/src/main/App.js
>>>>>>> signup

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route> 
          {/* <Route path="/home" exact>
            <Main />
          </Route>  */}
          <Route path="/signup" exact>
            <Signup />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
