import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

function Divider({ margin }) {
  return <div className="divider" style={{ margin }}></div>;
}

Divider.propTypes = {
  margin: PropTypes.string,
};

Divider.defaultProps = {
  margin: "12px 0px",
};

export default Divider;
