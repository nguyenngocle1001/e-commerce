import React from "react";
import PropTypes from "prop-types";
import { Rate } from "antd";
import { useNavigate } from "react-router-dom";

import format from "utils/format";
import Favourite from "../Favourite";

import "./style.scss";

function Product({
  id,
  image,
  name,
  ratingsAverage,
  ratingsQuantity,
  price,
  sellPrice,
  discount,
  isFavourite,
  slug,
}) {
  const navigate = useNavigate();

  const handleOnFavoriteClick = () => {
  };

  const handleOnClick = () => {
    navigate(`/products/${slug}`);
  };

  return (
    <div className="product">
      <span className="product__mask" onClick={handleOnClick} />

      <img src={image} className="product__img" alt={name} />
      <h3 className="product__name">{name}</h3>

      <span className="product__sell-price price">
        {format.price(sellPrice)}
      </span>
      <span className="product__price price">
        {discount && format.price(price)}
      </span>

      <div className="product__group">
        <span className="product__favourite" onClick={handleOnFavoriteClick}>
          <Favourite isFavourite={isFavourite} />
        </span>

        <span className="product__rating">
          <Rate disabled allowHalf value={ratingsAverage} />({ratingsQuantity})
        </span>
      </div>

      {discount > 0 && <span className="product__discount">{discount} %</span>}
    </div>
  );
}

Product.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  ratingsAverage: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  sellPrice: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  isFavourite: PropTypes.bool,
  ratingsQuantity: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  favouriteQuantity: PropTypes.number.isRequired,
};

Product.defaultProps = {
  isFavourite: false,
};

export default Product;
