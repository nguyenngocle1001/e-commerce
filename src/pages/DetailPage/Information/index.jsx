import React from "react";
import PropTypes from "prop-types";
import { Rate } from "antd";

import format from "utils/format";

import Share from "components/common/Share";
import Divider from "components/common/Divider";

import InputQuantity from "../InputQuantity";
import FavouriteAction from "../FavouriteAction";

import "./style.scss";

function Information({ product }) {
  return (
    <div className="detail-information">
      <h1 className="detail-information__heading">{product.name}</h1>
      <span className="detail-information__rating">
        <Rate disabled allowHalf value={product.ratingsAverage} />
        <span>{product.ratingsQuantity} vote</span>
      </span>
      <div className="detail-information__group">
        <span className="price detail-information__sellPrice">
          {format.price(product.sellPrice)}
        </span>

        <span className="price detail-information__price">
          {format.price(product.price)}
        </span>
      </div>

      <div className="detail-information__group">
        <span className="detail-information__group__name">Discount</span>

        <span className="detail-information__group__value">
          {product.discount}%
        </span>
      </div>

      <Divider />

      <div className="detail-information__group">
        <span className="detail-information__group__name">Availability</span>
        <span className="detail-information__available">
          {product.quantity === 0 ? "soldout" : "in stock"}
        </span>
      </div>

      <InputQuantity product={product} />

      <div className="detail-information__group">
        <FavouriteAction />

        <Share />
      </div>

      <Divider />

      <div className="detail-information__group">
        <span className="detail-information__group__name">Category:</span>
        <span className="detail-information__group__value">
          {product.category.name}
        </span>
      </div>

      <div className="detail-information__group">
        <span className="detail-information__group__name">Brand:</span>
        <span className="detail-information__group__value">
          {product.brand.name}
        </span>
      </div>
    </div>
  );
}

Information.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Information;
