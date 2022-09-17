import React from "react";
import PropTypes from "prop-types";
import { IoIosArrowDown } from "react-icons/io";

import "./style.scss";

function ButtonDropDown({ text, className, active, ...rest }) {
  return (
    <button
      className={`button-drop-down ${className} ${active ? "active" : ""}`}
      {...rest}
    >
      {text} <IoIosArrowDown className="button-drop-down__icon" />
    </button>
  );
}

ButtonDropDown.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

ButtonDropDown.defaultProps = {
  className: "",
  active: false,
};

export default ButtonDropDown;
