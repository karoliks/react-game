import store from "../../../config/store";
import { useState, useEffect } from "react";

function Jim() {
  const [message, setMessage] = useState(
    "Hey there! I can build a bridge to help you cross the river if you give me 50 coins"
  );
  const [answers, setAnswers] = useState(["Yes, please do!", "Not now"]);

  // maybe it should be connected to the users answer instead?
  const bridgeShouldShow = store.getState().world.unlockedStuff.bridge;

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
  };
}

export { Jim };
