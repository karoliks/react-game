import React, { useState, useEffect } from "react";
import store from "../../config/store";

import { connect } from "react-redux";
import "./styles.css";

// do not think this part is ideal, but it works:)

function Modal({ show, character }) {
  const showHideClassName = show ? " display-block" : " display-none";
  const answers = ["Yes, please do!", "Not now"]; // should this really be here?
  const [selectedOption, _setSelectedOption] = useState(0);

  const selectedOptionRef = React.useRef(selectedOption);
  const setSelectedOption = (data) => {
    selectedOptionRef.current = data;
    _setSelectedOption(data);
  };

  // connects key-pressing to actions
  useEffect(
    () => {
      function handleKeyDown(event) {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
          store.dispatch({
            type: "UPDATE_ANSWER",
            payload: selectedOptionRef.current,
          });
          if (selectedOptionRef.current === 0) {
            store.dispatch({
              type: character.storeChangeIfZero.type,
              payload: character.storeChangeIfZero.payload,
            });
            if (character.answers.chargeAtZero) {
              store.dispatch({
                type: "REDUCE_COINS",
                payload: character.moneyCharge,
              });
            }
          }
          // }
          setSelectedOption(0);
        } else if (event.code === "ArrowDown" || event.code === "ArrowRight") {
          setSelectedOption(
            (selectedOption + 1) % character.answers.answers.length
          );
        } else if (event.code === "ArrowUp" || event.code === "ArrowLeft") {
          // hacky way since javascript-modulo doesnt behave as I want it to
          setSelectedOption(
            (selectedOption + character.answers.answers.length - 1) %
              character.answers.answers.length
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
    },
    // Why do I need answers here? Don't think I use it:S
    [selectedOption, answers]
  );

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div
          className={character.className}
          style={{
            height: "60px",
            width: "60px",
          }}
        ></div>
        <div className="message-section">
          <h4 style={{ margin: 0 }}>{character.name}</h4>
          <p
            style={{
              margin: 0,
              fontsmooth: "never",
              webkitfontsmoothing: "none",
            }}
          >
            {character.message}
          </p>
          <form>
            {character.answers.answers.map((ans, i) => (
              <div key={i}>
                <label htmlFor={ans}>
                  <input
                    type="radio"
                    id={ans}
                    name="answer"
                    checked={selectedOption === i}
                    onChange={() => {}}
                    key={i}
                  />
                  {ans}
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
