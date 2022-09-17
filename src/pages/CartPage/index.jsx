import { Col, Row } from "antd";
import NoItem from "components/common/NoItem";
import useCartSelector from "hooks/selectors/useCartSelector";
import React, { useEffect } from "react";
import CartListing from "./CartListing";

import "./style.scss";
import Summary from "./Summary";

function CartPage() {
  const { data } = useCartSelector();

  useEffect(() => {
    document.title = "Lexe Store | Cart";
  }, []);

  return (
    <div className="container">
      <div className="cart-page">
        <h1 className="cart-page__heading">Shopping Cart</h1>

        {!data.data.products || (data.data.products.length === 0 && <NoItem />)}

        <Row gutter={20} style={{ rowGap: 20 }}>
          <Col xl={18} md={18} sm={24} xs={24}>
            <CartListing />
          </Col>

          <Col xl={6} md={6} sm={24} xs={24}>
            <Summary />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CartPage;
