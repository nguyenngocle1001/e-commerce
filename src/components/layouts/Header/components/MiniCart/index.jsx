import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

import { AUTH } from "constants/props";
import useCartSelector from "hooks/selectors/useCartSelector";
import useAuthSelector from "hooks/selectors/useAuthSelector";

import { CART_API } from "constants/apiPath";

import { IoIosClose } from "react-icons/io";
import { BsCartX } from "react-icons/bs";
import { FiUser } from "react-icons/fi";

import Button from "components/common/Button";
import CardItem from "../CartItem";

import "./style.scss";

function MiniCart({ onClose, className }) {
  const { data, onGetCart, onRemoveFromCart } = useCartSelector();
  const { data: auth } = useAuthSelector(AUTH.login);
  const navigate = useNavigate();

  const handleOnRedirectToLogin = () => {
    navigate("/login");
    onClose();
  };

  const handleOnRedirectToCart = () => {
    navigate("/cart");
  };

  const handleOnRemoveCart = (id) => {
    onRemoveFromCart(`${CART_API}/${id}/product`);
  };

  useEffect(() => {
    if (auth.data.token) onGetCart();
  }, []);

  return (
    <div className={`mini-cart ${className}`}>
      <div className="mini-cart__header">
        <span className="mini-cart__header__text">My Cart</span>

        <button className="mini-cart__header__btn" onClick={onClose}>
          <IoIosClose />
        </button>
      </div>

      {!auth.data.token ? (
        <>
          <div className="mini-cart__empty">
            <FiUser className="mini-cart__empty__icon" />

            <h3 className="mini-cart__empty__heading">You can not login.</h3>

            <Button
              className="mini-cart__empty__btn"
              onClick={handleOnRedirectToLogin}
            >
              LOGIN NOW
            </Button>
          </div>
        </>
      ) : !data.data.products || data.data.products.length === 0 ? (
        <div className="mini-cart__empty">
          <BsCartX className="mini-cart__empty__icon" />

          <h3 className="mini-cart__empty__heading">Your cart is empty.</h3>

          <Button className="mini-cart__empty__btn" onClick={onClose}>
            RETURN TO SHOP
          </Button>
        </div>
      ) : (
        <>
          <ul className="mini-cart__list">
            {data.data.products.map((item, index) => (
              <li className="mini-cart__item" key={index}>
                <CardItem product={item} onRemove={handleOnRemoveCart} />
              </li>
            ))}
          </ul>

          <Button className="mini-cart__btn" onClick={handleOnRedirectToCart}>
            View Cart
          </Button>
        </>
      )}
    </div>
  );
}

MiniCart.propTypes = {
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};

export default MiniCart;
