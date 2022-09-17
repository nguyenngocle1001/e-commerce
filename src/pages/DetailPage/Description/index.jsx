import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

function Description({ value }) {
  return (
    <div
      className="detail-description"
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}

Description.propTypes = {
  value: PropTypes.string,
};

export default Description;
