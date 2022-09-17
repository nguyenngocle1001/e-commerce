import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function BannerItem({ image, keyword }) {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(`/products?q=${keyword}`);
  };
  return (
    <div className="banner__item">
      <img className="banner__img" src={image} alt={`Banner of ${keyword}`} />

      <button className="banner__btn" onClick={handleOnClick}>
        go now
      </button>
    </div>
  );
}

BannerItem.propTypes = {
  image: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
};

export default BannerItem;
