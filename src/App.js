import Home from "./pages/Home";
import NewGame from "./pages/NewGame";
import React from "react";
import { Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Route path="/" component={Home} />
      <Route path="/newGame" component={NewGame} />
    </div>
  );
}

export default App;
