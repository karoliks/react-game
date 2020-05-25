import React from "react";
import { connect } from "react-redux";
import store from "../../config/store";
import "./styles.css";

function Modal({ show }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const message =
    "Howdy! I can build a boat to help you cross the river if you give me 50 coins";

  function handleClose() {
    store.dispatch({
      type: "SHOW_MODAL",
      payload: {
        show: false,
      },
    });
  }

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {message}
        <button onClick={handleClose}>Ok</button>
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
