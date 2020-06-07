import store from "../../../config/store";
import { useState, useEffect } from "react";
// have to fix the money
function Jim() {
  const moneyCharge = 50;

  const [message, setMessage] = useState(
    "Hey there! I can build a bridge to help you cross the river if you give me 50 coins"
  );

  const [storeChangeIfZero, setStoreChangeIfZero] = useState({
    type: "SHOW_BRIDGE",
    payload: false,
  });
  const [answers, setAnswers] = useState([
    "Ok, I'll be back when I have enough money",
  ]);

  // maybe it should be connected to the users answer instead?
  const bridgeShouldShow = store.getState().world.unlockedStuff.bridge;
  const usersCurrentMoney = store.getState().stats.coins;

  // if the user automaticly starts with enough money, the useres will be wrong. the user must change the amount in some way for it to work
  useEffect(() => {
    if (usersCurrentMoney >= moneyCharge) {
      setAnswers(["Yes, please do!", "Not now"]);
      setStoreChangeIfZero({ type: "SHOW_BRIDGE", payload: true });
    }
  }, [usersCurrentMoney, moneyCharge]);

  useEffect(() => {
    if (bridgeShouldShow) {
      setMessage("The bridge is finished! Happy to help!");
      setAnswers([]);
    }
  }, [bridgeShouldShow]);

  return {
    name: "Jim",
    message: message,
    answers: answers,
    className: "big-farmer",
    moneyCharge: moneyCharge,
    storeChangeIfZero: storeChangeIfZero,
  };
}

export { Jim };
