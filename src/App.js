import React, { Component } from "react";
import World from "./features/world"; // activate for movement on grass etc

class App extends Component {
  render() {
    return (
      <div>
        <World />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src="https://github.com/karoliks/react-game/blob/master/public/Manual-RPG.png?raw=true"
            alt="Manual"
            style={{ maxWidth: "100vw" }}
          />
        </div>
      </div>
    );
  }
}

export default App;
