import React from "react";
import { connect } from "react-redux";
import store from "../../config/store";
import { useEffect } from "react";

import Player from "../player";
import Map from "../map";
import Modal from "../modal";
import Stats from "../stats";
import InfoBox from "../infobox";

import Game from "../game";

import { tiles0 } from "../../data/maps/0";
import { tiles1 } from "../../data/maps/1";
import { tiles2 } from "../../data/maps/2";

import { Jim } from "../../data/characters/jim";
import { Guard } from "../../data/characters/guard";

function World(props) {
  const tiles = [tiles0, tiles1(), tiles2];
  // const characters = { jim: Jim(), guard: Guard };
  const bridgeShouldShow = store.getState().world.unlockedStuff.bridge;
  const usersCurrentMoney = store.getState().stats.coins;
  const moneyCharge = store.getState().world.historyProgress["jim"][
    "moneyCharge"
  ];

  useEffect(() => {
    if (usersCurrentMoney >= moneyCharge) {
      store.dispatch({
        type: "JIM_AFTER_ENOUGH_MONEY",
      });
    }
  }, [usersCurrentMoney, moneyCharge]);

  useEffect(() => {
    if (bridgeShouldShow) {
      store.dispatch({
        type: "JIM_AFTER_BUILT_BRIDGE",
      });
    }
  }, [bridgeShouldShow]);

  store.dispatch({
    type: "ADD_TILES",
    payload: {
      tiles: tiles[props.mapNum],
    },
  });

  store.dispatch({
    type: "SET_VALUES_FOR_CHARACTER",
    payload: props.historyProgress[props.currentCharacter],
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
        <InfoBox />
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
