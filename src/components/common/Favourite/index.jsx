import React, { useState } from "react";
import PropTypes from "prop-types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import "./style.scss";

function Favourite({ isFavourite, onClick }) {
  return (
    <button
      className={`favourite${isFavourite ? " active" : ""}`}
      onClick={onClick}
    >
      {isFavourite ? <AiFillHeart /> : <AiOutlineHeart />}
    </button>
  );
}

Favourite.propTypes = {
  isFavourite: PropTypes.bool,
};

Favourite.defaultProps = {
  isFavourite: false,
};

export default Favourite;
