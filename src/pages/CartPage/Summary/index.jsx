import React from "react";

import useCartSelector from "hooks/selectors/useCartSelector";
import format from "utils/format";

import "./style.scss";
import Divider from "components/common/Divider";
import Button from "components/common/Button";
import { useNavigate } from "react-router-dom";

const generateTotal = (products = []) => {
  let total = 0;
  products.forEach((product) => {
    total += product.quantity * product.product.sellPrice;
  });

  return total;
};

function Summary() {
  const { data } = useCartSelector();

  const navigate = useNavigate();

  const handleOnPayment = () => {
    navigate("/payment");
  };

  if (data.data.products && data.data.products.length === 0) return <></>;

  return (
    <div className="cart-page-summary">
      <h3 className="cart-page-summary__heading">Summary</h3>

      <div className="cart-page-summary__group">
        <span className="cart-page-summary__value">Subtotal</span>
        <span className="cart-page-summary__value price">
          {format.price(generateTotal(data.data.products || []))}
        </span>
      </div>

      <div className="cart-page-summary__group">
        <span className="cart-page-summary__value">Shipping</span>
        <span className="cart-page-summary__value price">
          {format.price(0)}
        </span>
      </div>

      <Divider />

      <div className="cart-page-summary__group">
        <span className="cart-page-summary__value">Order Total</span>
        <span className="cart-page-summary__value price">
          {format.price(generateTotal(data.data.products || []))}
        </span>
      </div>

      <Button onClick={handleOnPayment}>PROCESSED TO CHECKOUT</Button>
    </div>
  );
}

export default Summary;
