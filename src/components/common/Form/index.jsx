import React from "react";
import PropTypes from "prop-types";

import Message from "../Message";
import "./style.scss";

function Form({ children, onSubmit, message, className }) {
  return (
    <form className={`form ${className}`} onSubmit={onSubmit}>
      <div className="form__body">{children}</div>
      <Message type="error" text={message} />
    </form>
  );
}

Form.propTypes = {
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  message: PropTypes.string,
};

Form.defaultProps = {
  className: "",
  message: "",
};

export default Form;
