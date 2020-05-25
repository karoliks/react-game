import React from "react";
import { connect } from "react-redux";
import "./styles.css";

function Stats(props) {
  return (
    <div
      className="stat-box"
      style={{
        position: "absolute",
        right: 0,
        top: 0,
        color: "white",
        backgroundColor: "black",
        border: "white solid 2px",
        padding: "2px",
      }}
    >
      Coins: {props.coins}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    ...state.stats,
  };
}

export default connect(mapStateToProps)(Stats);
