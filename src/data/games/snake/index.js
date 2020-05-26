import React, { useState, useEffect } from "react";
import store from "../../../config/store";

import Snake from "./snake";
import Food from "./food";
import "./styles.css";

// function to get new coordinates for food
const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};

function SnakeGame({ startGame }) {
  // state for the game
  const [food, setFood] = useState(getRandomCoordinates());
  const [speed, setSpeed] = useState(200);
  const [direction, setDirection] = useState("EAST");
  const [snakeDots, setSnakeDots] = useState([
    [0, 0],
    [2, 0],
  ]);
  const [result, setResult] = useState(2);
  const [showResult, setShowResult] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const showHideClassName = showResult
    ? "result-box display-block"
    : "result-box display-none";

  // how to respond to the keys pressed by the user
  function handleKeyDown(e) {
    e = e || window.event;
    switch (e.keyCode) {
      case 32:
        // tell everything that the game is finished (if it is)
        if (gameFinished) {
          setGameFinished(false);
        }
        return;
      case 37:
        setDirection("WEST");
        return;
      case 38:
        setDirection("NORTH");

        return;
      case 39:
        setDirection("EAST");

        return;
      case 40:
        setDirection("SOUTH");

        return;
      default:
        console.log(e.keyCode);
    }
  }

  useEffect(() => {
    if (!gameFinished) {
      const oldGameNum = store.getState().game.currentGame;
      store.dispatch({
        type: "END_GAME",
        payload: {
          gamePlaying: false,
          currentGame: oldGameNum,
        },
      });
      setShowResult(false);
    }
  }, [gameFinished]);

  // register pressed keys
  window.addEventListener("keydown", (e) => {
    if (startGame) {
      e.preventDefault();
      handleKeyDown(e);
    }
  });

  // function that moves (and increases the length of) the snake
  // adding dot in the front, and subtractiong in the back gives the illusion of movement
  const moveSnake = (doEnlarge) => {
    let dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch (direction) {
      case "SOUTH":
        head = [head[0], head[1] + 2];
        break;
      case "EAST":
        head = [head[0] + 2, head[1]];
        break;
      case "WEST":
        head = [head[0] - 2, head[1]];
        break;
      case "NORTH":
        head = [head[0], head[1] - 2];
        break;
      default:
        break;
    }

    // adds new dot
    dots.push(head);

    // removes the last dot if the snakes length should not increase
    if (!doEnlarge) {
      dots.shift();
    }

    setSnakeDots([...dots]);
  };

  // updates the snake after desired time/speed
  useEffect(() => {
    if (!startGame || gameFinished) {
      return;
    }
    const interval = setInterval(() => {
      moveSnake(checkIfEat());
      checkIfOutOfBorder();
      checkIfCollapsed();
    }, speed);
    return () => clearInterval(interval);
  });

  // when the player loses
  function onGameOver() {
    // alert(`Game Over! Snake length is ${snakeDots.length}`);
    setResult(snakeDots.length);
    setShowResult(true);
    setGameFinished(true);

    // reset values to start over
    setFood(getRandomCoordinates());
    setSpeed(200);
    setDirection("EAST");
    setSnakeDots([
      [0, 0],
      [2, 0],
    ]);
  }

  // update coins for player after finished game
  useEffect(() => {
    const oldCoins = store.getState().stats.coins;
    store.dispatch({
      type: "UPDATE_COINS",
      payload: {
        coins: oldCoins + result,
      },
    });
  }, [result]);

  // checks if the snake is trying to cross the border
  function checkIfOutOfBorder() {
    const head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      onGameOver();
    }
  }

  // checks if the snake hits itself
  function checkIfCollapsed() {
    const snake = snakeDots;
    const head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        onGameOver();
      }
    });
  }

  // decrease update-interval
  function increaseSpeed() {
    if (speed > 10) {
      setSpeed((speed) => speed - 10);
    }
  }

  // check if the snack has hit food
  function checkIfEat() {
    const head = snakeDots[snakeDots.length - 1];
    if (head[0] === food[0] && head[1] === food[1]) {
      setFood(getRandomCoordinates());
      increaseSpeed();
      return true;
    }
    return false;
  }

  return (
    <div className="game-area">
      <Snake snakeDots={snakeDots}></Snake>
      <Food dot={food}></Food>
      <div className={showHideClassName}>
        <h3>Game over!</h3>
        <p>You were able to collect {result} coins. Well done!</p>
      </div>
    </div>
  );
}

export default SnakeGame;
