import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Main from './main/main';
import Signup from './userAuth/signup';
import Login from './userAuth/login';
import BattleSystem from './battleSystem/battleSystem'
import Social from './social/socialPage'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/battleSystem" exact>
            <BattleSystem />
          </Route>
          <Route path="/social" exact>
            <Social />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
