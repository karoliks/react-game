import React, { useState, useEffect } from "react";
import store from "../../config/store";

import { connect } from "react-redux";
import "./styles.css";

// do not think this part is ideal, but it works:)

function InfoBox({ show, type }) {
  const showHideClassName = show ? " display-block" : " display-none";

  // connects key-pressing to actions
  //   useEffect(() => {
  //     function handleKeyDown(event) {
  //       if (
  //         event.code === "Enter" ||
  //         event.code === "NumpadEnter" ||
  //         event.code === "Space"
  //       ) {
  //         store.dispatch({
  //           type: "HIDE_INFOBOX",
  //         });
  //       }
  //     }
  //     // only interact with the modal if it is showing
  //     if (store.getState().modal.show) {
  //       const listener = (event) => {
  //         handleKeyDown(event);
  //       };
  //       document.addEventListener("keydown", listener);
  //       return () => {
  //         document.removeEventListener("keydown", listener);
  //       };
  //     }
  //   });

  return (
    <div className={showHideClassName}>
      <section className="infobox-main">
        <div className={type.className}></div>
        <div className="message-section">
          <h2 style={{ margin: 0 }}>{type.title}</h2>
          <p>{type.text}</p>
        </div>
      </section>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    ...state.infobox,
  };
}

export default connect(mapStateToProps)(InfoBox);
