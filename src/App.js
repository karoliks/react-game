import React, { Component } from "react";
import World from "./features/world"; // activate for movement on grass etc

class App extends Component {
  render() {
    return (
      <div>
        <World />
        <img src="/react-game/public/Manual-RPG.png" alt="Manual" />
      </div>
    );
  }
}

export default App;
