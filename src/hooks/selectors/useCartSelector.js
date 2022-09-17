import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  cartDeleteRequest,
  cartGetRequest,
  cartPostRequest,
  cartSelector,
} from "slices/cartSlice";

const useCartSelector = () => {
  const data = useSelector(cartSelector);
  const dispatch = useDispatch();

  const onGetCart = useCallback(() => dispatch(cartGetRequest()), []);

  const onAddToCart = useCallback(
    (body) => dispatch(cartPostRequest({ body })),
    []
  );

  const onRemoveFromCart = useCallback(
    (url) => dispatch(cartDeleteRequest({ url })),
    []
  );

  return { data, onGetCart, onAddToCart, onRemoveFromCart };
};

export default useCartSelector;
