import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

function Message({ type, text }) {
  return <span className={`message ${type}`}>{text}</span>;
}

Message.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
};

Message.defaultProps = {
  text: "",
  type: "success",
};

export default Message;
