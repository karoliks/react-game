import store from "../../config/store";
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from "../../config/constants";

export default function handleMovement(player) {
  // find new position given old position and desired direction
  function getNewPosition(oldPos, direction) {
    switch (direction) {
      case "WEST":
        return [oldPos[0] - SPRITE_SIZE, oldPos[1]];
      case "EAST":
        return [oldPos[0] + SPRITE_SIZE, oldPos[1]];
      case "NORTH":
        return [oldPos[0], oldPos[1] - SPRITE_SIZE];
      case "SOUTH":
        return [oldPos[0], oldPos[1] + SPRITE_SIZE];
      default:
        return oldPos;
    }
  }

  //   boolean function to determine whether the sprite is at an edge
  function observeBoundaries(newPos) {
    return (
      newPos[0] >= 0 &&
      newPos[0] <= MAP_WIDTH - SPRITE_SIZE &&
      newPos[1] >= 0 &&
      newPos[1] <= MAP_HEIGHT - SPRITE_SIZE
    );
  }

  // find the location to the relevant sprite on the sprite image
  function getSpriteLocation(direction, walkIndex) {
    switch (direction) {
      case "SOUTH":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`;
      case "EAST":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`;
      case "WEST":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 2}px`;
      case "NORTH":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 3}px`;
      default:
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`;
    }
  }

  function getWalkIndex() {
    const walkIndex = store.getState().player.walkIndex;
    return walkIndex >= 7 ? 0 : walkIndex + 1;
  }

  //   boolean function to determine whether the sprite is trying to pass an object
  function observeImpassable(newPos) {
    const tiles = store.getState().map.tiles;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;
    const nextTile = tiles[y][x];
    return nextTile <= 100;
  }

  // Move sprite to desired location
  function dispatchMove(direction, newPos) {
    const walkIndex = getWalkIndex();
    store.dispatch({
      type: "MOVE_PLAYER",
      payload: {
        position: newPos,
        direction: direction,
        walkIndex: walkIndex,
        spriteLocation: getSpriteLocation(direction, walkIndex),
      },
    });
  }

  // Check if desired move is possible, and if possible, move the sprite
  function attemtMove(direction) {
    const oldPos = store.getState().player.position;
    const newPos = getNewPosition(oldPos, direction);
    if (observeBoundaries(newPos) && observeImpassable(newPos)) {
      dispatchMove(direction, newPos);
    }
  }

  function changeWorld() {
    const oldMapNum = store.getState().world.mapNum;

    store.dispatch({
      type: "CHANGE_WORLD",
      payload: {
        mapNum: (oldMapNum + 1) % 3,
      },
    });
  }

  // talk to the redux-store so that game can begin
  function startGame() {
    const oldGameNum = store.getState().game.currentGame;

    store.dispatch({
      type: "START_GAME",
      payload: {
        gamePlaying: true,
        currentGame: oldGameNum,
      },
    });
  }

  // talk to the redux-store so that game can begin
  function endGame() {
    const oldGameNum = store.getState().game.currentGame;

    store.dispatch({
      type: "END_GAME",
      payload: {
        gamePlaying: false,
        currentGame: oldGameNum,
      },
    });
  }

  function openChest() {
    // TODO
    return;
  }

  function toggleFarmerTalk() {
    const oldShow = store.getState().modal.show;

    store.dispatch({
      type: "SHOW_MODAL",
      payload: {
        show: !oldShow,
        chosenAnswer: -1,
      },
    });
  }

  function stopFarmerTalk() {
    store.dispatch({
      type: "SHOW_MODAL",
      payload: {
        show: false,
        chosenAnswer: -1,
      },
    });
  }

  // check what space means in the current position
  function handleSpace() {
    const oldPos = store.getState().player.position;
    const tiles = store.getState().map.tiles;
    const y = oldPos[1] / SPRITE_SIZE;
    const x = oldPos[0] / SPRITE_SIZE;
    const currentTile = tiles[y][x];

    switch (currentTile) {
      case 0:
        stopFarmerTalk();
        break;
      case 1:
        changeWorld();
        stopFarmerTalk();
        break;
      case 2:
        toggleFarmerTalk();
        break;
      case 4:
        openChest();
        stopFarmerTalk();
        break;
      case 10:
        startGame();
        break;
      default:
        return;
    }
  }

  // translate keycodes to directions
  function handleKeyDown(e) {
    const gamePlaying = store.getState().game.gamePlaying;
    // if a game is currently playing the sprite should not be able to move
    if (gamePlaying) {
      return;
    }
    e.preventDefault();
    switch (e.keyCode) {
      case 32:
        return handleSpace();
      case 37:
        return attemtMove("WEST");
      case 38:
        return attemtMove("NORTH");
      case 39:
        return attemtMove("EAST");
      case 40:
        return attemtMove("SOUTH");
      default:
        return;
      //console.log(e.keyCode);
    }
  }

  window.addEventListener("keydown", (e) => {
    const modalIsShowing = store.getState().modal.show;
    if (!modalIsShowing) {
      handleKeyDown(e);
    }
  });

  return player;
}
