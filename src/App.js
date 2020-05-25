import React, { Component } from "react";
import World from "./features/world"; // activate for movement on grass etc
import SnakeGame from "./data/games/snake";

class App extends Component {
  render() {
    return (
      <div>
        {/* <SnakeGame></SnakeGame> */}
        <World />
      </div>
    );
  }
}

export default App;
