import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Signup from './signup/signup';
import Login from './login/login';

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
