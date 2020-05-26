import React from "react";
import { connect } from "react-redux";
import Snake from "../../data/games/snake";
import "./styles.css";

function Game({ gamePlaying }) {
  // ensures that the game only is showing when it is supposed to
  const showHideClassName = gamePlaying ? "display-block" : "display-none";

  const games = [Snake];

  return (
    <div className={showHideClassName}>
      <Snake startGame={gamePlaying}></Snake>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    ...state.game,
  };
}

export default connect(mapStateToProps)(Game);
