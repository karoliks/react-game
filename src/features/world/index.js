import React from "react";
import { connect } from "react-redux";
import store from "../../config/store";

import Player from "../player";
import Map from "../map";
import Modal from "../modal";
import Stats from "../stats";
import Game from "../game";

import { tiles0 } from "../../data/maps/0";
import { tiles1 } from "../../data/maps/1";
import { tiles2 } from "../../data/maps/2";

function World(props) {
  const tiles = [tiles0, tiles1(), tiles2];

  store.dispatch({
    type: "ADD_TILES",
    payload: {
      tiles: tiles[props.mapNum],
    },
  });
  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "800px",
          height: "400px",
          margin: "20px auto",
          border: "solid white 2px",
          boxsizing: "content-box",
        }}
      >
        <Map />
        <Player />
        <Modal />
        <Stats />
        <Game />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.world,
  };
}

export default connect(mapStateToProps)(World);
