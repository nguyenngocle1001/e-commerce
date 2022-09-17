import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

function LoadMoreButton({ text, className, ...rest }) {
  return (
    <button className={`${className} load-more-button`} {...rest}>
      {text}
    </button>
  );
}

LoadMoreButton.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
};

LoadMoreButton.defaultProps = {
  text: "view more",
  className: "",
};

export default LoadMoreButton;
