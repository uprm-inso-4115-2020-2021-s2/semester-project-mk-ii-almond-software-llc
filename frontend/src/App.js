import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Signup from './signup/signup';
import Login from './login/login';
import BattleSystemPage from './Battle System Page/Battle-system-page'

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
          <Route path="/battle-system" exact>
            <BattleSystemPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
