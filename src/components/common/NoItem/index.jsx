import React from "react";
import { Link } from "react-router-dom";

import "./style.scss";

function NoItem() {
  return (
    <div className="no-item">
      <span className="no-item__value">
        You have no items in your shopping cart.
      </span>

      <span className="no-item__value">
        Click <Link to="/products">here</Link> to continue shopping.
      </span>
    </div>
  );
}

export default NoItem;
