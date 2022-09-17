import React from "react";
import PropTypes from "prop-types";
import "./style.scss";

function ColorCircle({ color, size }) {
  return (
    <div
      className="color-circle"
      style={{ background: color, width: size, height: size }}
    />
  );
}

ColorCircle.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.number,
};

ColorCircle.defaultProps = {
  size: 25,
};

export default ColorCircle;
