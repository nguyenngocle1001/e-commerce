import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

function FormLabel({ id, text, required }) {
  return (
    <label className={`form-label${required ? " required" : ""}`} htmlFor={id}>
      {text}
    </label>
  );
}

FormLabel.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  required: PropTypes.bool,
};

FormLabel.defaultProps = {
  id: "",
  text: "",
  required: false,
};

export default FormLabel;
