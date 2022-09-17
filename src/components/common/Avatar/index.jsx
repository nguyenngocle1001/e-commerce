import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

function Avatar({ image, text, width }) {
  return (
    <div className="image" style={{ width, height: width }}>
      {image ? (
        <img src={image} alt="avatar" className="image__img" />
      ) : (
        <span className="image__text">{text}</span>
      )}
    </div>
  );
}

Avatar.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
  width: PropTypes.number,
};

export default Avatar;
