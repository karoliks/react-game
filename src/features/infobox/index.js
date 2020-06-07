import React from "react";
import { connect } from "react-redux";
import "./styles.css";

function InfoBox({ show, type }) {
  const showHideClassName = show ? " display-block" : " display-none";

  return (
    <div className={showHideClassName}>
      <section className="infobox-main">
        <div className={type.className}></div>
        <div className="message-section-info">
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
