import React from "react";
import { connect } from "react-redux";
import { SPRITE_SIZE } from "../../config/constants";
import "./styles.css";

function getTileSprite(type) {
  switch (type) {
    case 0:
      return "grass";
    case 1:
      return "hole";
    case 2:
      return "talk";
    case 3:
      return "tree";
    case 4:
      return "chest";
    case 5:
      return "bridge";
    case 10:
      return "coins";
    case 115:
      return "rock";
    case 116:
      return "tree";
    case 117:
      return "river";
    case 118:
      return "farmer"; // bygge båt med snake?
    case 119:
      return "downsign";
    case 120:
      return "river-down-to-right";
    case 121:
      return "river-left-to-down";
    case 122:
      return "river-horiz";
    case 123:
      return "tree-forest";
    default:
      return;
  }
}

function MapTile(props) {
  return (
    <div
      className={`tile ${getTileSprite(props.tile)}`}
      style={{
        height: SPRITE_SIZE,
        width: SPRITE_SIZE,
      }}
    ></div>
  );
}

function MapRow(props) {
  return (
    <div
      className="row"
      style={{
        height: SPRITE_SIZE,
      }}
    >
      {props.tiles.map((tile, i) => (
        <MapTile tile={tile} key={i} />
      ))}
    </div>
  );
}

function Map(props) {
  return (
    <div
      style={{
        position: "relative",
        top: "0px",
        left: "0px",
        width: "800px",
        height: "400px",
      }}
    >
      {props.tiles.map((row, i) => (
        <MapRow tiles={row} key={i} />
      ))}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    tiles: state.map.tiles,
  };
}

export default connect(mapStateToProps)(Map);
