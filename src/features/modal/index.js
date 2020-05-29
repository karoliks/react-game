import React, { useState, useEffect } from "react";
import store from "../../config/store";

import { connect } from "react-redux";
import "./styles.css";
import { tiles2 } from "../../data/maps/2";

// do not think this part is ideal, but it works:)

function Modal({ show }) {
  const showHideClassName = show ? " display-block" : " display-none";
  const name = "Jim";
  const message =
    "Hey there! I can build a bridge to help you cross the river if you give me 50 coins";
  const answers = ["Yes", "No", "Maybe"];
  const [selectedOption, _setSelectedOption] = useState(0);

  const selectedOptionRef = React.useRef(selectedOption);
  const setSelectedOption = (data) => {
    selectedOptionRef.current = data;
    _setSelectedOption(data);
  };

  // connects key-pressing to actions
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        store.dispatch({
          type: "UPDATE_ANSWER",
          payload: {
            show: false,
            chosenAnswer: selectedOptionRef.current,
          },
        });
        store.dispatch({
          type: "SHOW_BRIDGE",
          payload: true,
        });
        setSelectedOption(0);
      } else if (event.code === "ArrowDown" || event.code === "ArrowRight") {
        setSelectedOption((selectedOption + 1) % answers.length);
      } else if (event.code === "ArrowUp" || event.code === "ArrowLeft") {
        // hacky way since javascript-modulo doesnt behave as I want it to
        setSelectedOption(
          (selectedOption + answers.length - 1) % answers.length
        );
      }
    }
    // only interact with the modal if it is showing
    if (store.getState().modal.show) {
      const listener = (event) => {
        handleKeyDown(event);
      };
      document.addEventListener("keydown", listener);
      return () => {
        document.removeEventListener("keydown", listener);
      };
    }
  }, [answers, selectedOption]);

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div
          className="big-farmer"
          style={{
            height: "60px",
            width: "60px",
          }}
        ></div>
        <div className="message-section">
          <h4 style={{ margin: 0 }}>{name}</h4>
          <p
            style={{
              margin: 0,
              fontsmooth: "never",
              webkitfontsmoothing: "none",
            }}
          >
            {message}
          </p>
          <form>
            {answers.map((ans, i) => (
              <div key={i}>
                <label htmlFor={ans}>
                  <input
                    type="radio"
                    id={ans}
                    name="answer"
                    checked={selectedOption == i}
                    onChange={() => {}}
                    key={i}
                  />
                  {ans} {i}
                </label>
              </div>
            ))}
          </form>
        </div>
      </section>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    ...state.modal,
  };
}

export default connect(mapStateToProps)(Modal);
