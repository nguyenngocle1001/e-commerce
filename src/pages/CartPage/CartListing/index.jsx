import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { Image, Table } from "antd";

import useToggle from "hooks/layouts/useToggle";
import useCartSelector from "hooks/selectors/useCartSelector";

import format from "utils/format";
import { CART_API } from "constants/apiPath";

import Button from "components/common/Button";

import "./style.scss";

function CartListing() {
  const { data, onGetCart, onRemoveFromCart } = useCartSelector();
  const [isChangeReload, onChangeReload] = useToggle();
  const navigate = useNavigate();

  const handleOnRemove = ({ _id }) => {
    onRemoveFromCart(`${CART_API}/${_id}/product`);
  };

  const handleOnClearAll = () => {
    onRemoveFromCart(`${CART_API}/clearAll`);
  };

  const handleOnContinues = () => {
    navigate("/products");
  };

  const columns = useMemo(
    () => [
      {
        title: "Image",
        dataIndex: "product",
        key: "product",
        render: (product) => <Image width={100} src={product.imageCover} />,
      },
      {
        title: "Item",
        dataIndex: "product",
        key: "product",
        render: (product) => (
          <Link to={`/products/${product.slug}`}>{product.name}</Link>
        ),
      },
      {
        title: "Price",
        dataIndex: "product",
        key: "price",
        render: (product) => (
          <span className="price">{format.price(product.sellPrice)}</span>
        ),
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Subtotal",
        dataIndex: "subtotal",
        key: "subtotal",
        render: (_, rowData) => (
          <span className="price">
            {format.price(rowData.quantity * rowData.product.sellPrice)}
          </span>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (_, rowData) => (
          <div className="cart-page-listing__action">
            <button
              className="cart-page-listing__action__btn"
              onClick={() => handleOnRemove(rowData)}
            >
              <FiTrash2 />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  useEffect(() => {
    onGetCart();
  }, [isChangeReload]);

  if (data.data.products && data.data.products.length === 0) return <></>;

  return (
    <div className="cart-page-listing">
      <Table
        columns={columns}
        className="cart-page-listing__table"
        dataSource={
          (data.data.products &&
            data.data.products.map((item) => ({ ...item, key: item._id }))) ||
          []
        }
        pagination={false}
        loading={data.status === "fetching"}
        bordered
      />

      <div className="cart-page-listing__action">
        <Button onClick={handleOnContinues}>CONTINUE SHOPPING</Button>
        <Button onClick={onChangeReload}>UPDATE SHOPPING CART</Button>
        <Button variant="normal" onClick={handleOnClearAll}>
          CLEAR SHOPPING CART
        </Button>
      </div>
    </div>
  );
}

export default CartListing;
