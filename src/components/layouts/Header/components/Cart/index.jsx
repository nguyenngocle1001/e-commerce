import React, { useEffect } from "react";
import { CgShoppingBag } from "react-icons/cg";

import { AUTH } from "constants/props";

import useAuthSelector from "hooks/selectors/useAuthSelector";
import useToggle from "hooks/layouts/useToggle";
import useDelayUnmount from "hooks/layouts/useDelayUnmount";
import useCartSelector from "hooks/selectors/useCartSelector";
import useLocationChange from "hooks/layouts/useLocationChange";

import BackDrop from "components/common/BackDrop";
import MiniCart from "../MiniCart";

import "./style.scss";

function Cart() {
  const [isShow, onChangeIsShow] = useToggle();
  const shouldRender = useDelayUnmount(isShow, 200);
  const { data, onGetCart } = useCartSelector();
  const { data: auth } = useAuthSelector(AUTH.login);

  useLocationChange(() => {
    if (isShow) onChangeIsShow();
  });

  useEffect(() => {
    if (auth.data.token) onGetCart();
  }, [auth]);

  return (
    <div className="header-cart">
      <button className="header-cart__btn" onClick={onChangeIsShow}>
        <CgShoppingBag className="header-cart__btn__icon" />

        <span className="header-cart__btn__number">
          {auth.data.token && data.data.products ? data.data.products.length : 0}
        </span>
      </button>

      {shouldRender && (
        <BackDrop visible={shouldRender} onClickOutSide={onChangeIsShow}>
          <MiniCart
            onClose={onChangeIsShow}
            className={isShow ? "" : "unmount"}
          />
        </BackDrop>
      )}
    </div>
  );
}

export default Cart;
