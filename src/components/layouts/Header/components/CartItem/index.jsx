import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import format from "utils/format";
import { GoTrashcan } from "react-icons/go";

import "./style.scss";
import useCartSelector from "hooks/selectors/useCartSelector";
import { CART_API } from "constants/apiPath";

function CardItem({ product, onRemove }) {
  const handleOnRemove = () => {
    onRemove(product._id);
  };

  return (
    <div className="cart-item">
      <img
        src={product.product.imageCover}
        alt=""
        className="cart-item__image"
      />

      <div className="cart-item__info">
        <Link
          to={`/products/${product.product.slug}`}
          className="cart-item__name"
        >
          {product.product.name}
        </Link>
        <div className="cart-item__info__desc">
          x{product.quantity}
          <span className="price cart-item__price">
            {format.price(product.product.sellPrice)}
          </span>
          <div className="color" style={{ background: product.color.value }} />
          <span className="size">{product.size.value}</span>
        </div>
      </div>

      <div className="cart-item__action">
        <GoTrashcan className="cart-item__btn error" onClick={handleOnRemove} />
      </div>
    </div>
  );
}

CardItem.propTypes = {
  product: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CardItem;
