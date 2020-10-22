import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NewGame from "./pages/NewGame";
import React from "react";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/newGame" component={NewGame} />
      </Switch>
    </div>
  );
}

export default App;
