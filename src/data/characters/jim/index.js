import store from "../../../config/store";
import { useState, useEffect } from "react";
// have to fix the money
function Jim() {
  // const [moneyCharge, setMoneyCharge] = useState(50);

  // const [message, setMessage] = useState(
  //   "Hey there! I can build a bridge to help you cross the river if you give me 50 coins"
  // );

  // const [storeChangeIfZero, setStoreChangeIfZero] = useState({
  //   type: "SHOW_BRIDGE",
  //   payload: false,
  // });
  // const [answers, setAnswers] = useState({
  //   answers: ["Ok, I'll be back when I have enough money"],
  //   chargeAtZero: false,
  // });

  // maybe it should be connected to the users answer instead?
  const bridgeShouldShow = store.getState().world.unlockedStuff.bridge;
  const usersCurrentMoney = store.getState().stats.coins;
  const moneyCharge = store.getState().world.historyProgress[Jim].moneyCharge;

  // this causes a warning:
  // Warning: Cannot update a component (`ConnectFunction`) while rendering a different component (`World`).
  useEffect(() => {
    if (usersCurrentMoney >= moneyCharge) {
      store.dispatch({
        type: "JIM_AFTER_ENOUGH_MONEY",
      });
      // setAnswers({
      //   answers: ["Yes, please do!", "Not now"],
      //   chargeAtZero: true,
      // });
      // setStoreChangeIfZero({ type: "SHOW_BRIDGE", payload: true });
    }
  }, [usersCurrentMoney, moneyCharge]);

  useEffect(() => {
    if (bridgeShouldShow) {
      store.dispatch({
        type: "JIM_AFTER_BUILT_BRIDGE",
      });
      // setMessage("The bridge is finished! Happy to help!");
      // setAnswers({ answers: [], chargeAtZero: false });
    }
  }, [bridgeShouldShow]);

  // useEffect(() => {
  //   if (answers.length === 0) {
  //     setMoneyCharge(0);
  //   }
  // }, [answers.length]);

  return;
  // {
  //   name: "Jim",
  //   message: message,
  //   answers: answers,
  //   className: "big-farmer",
  //   moneyCharge: moneyCharge,
  //   storeChangeIfZero: storeChangeIfZero,
  // };
}

export { Jim };
