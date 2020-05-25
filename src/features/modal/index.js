import React from "react";
import { connect } from "react-redux";
import "./styles.css";

function Modal({ show }) {
  const showHideClassName = show ? " display-block" : " display-none";
  const name = "Jim";
  const message =
    "Hey there! I can build a boat to help you cross the river if you give me 50 coins";

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
          <p style={{ margin: 0 }}>{message}</p>
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
