import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productGetRequest, productsByPropSelector } from "slices/productSlice";

const useProductSelector = (prop) => {
  const products = useSelector(productsByPropSelector(prop));
  const dispach = useDispatch();

  const onGetProducts = useCallback(({ url, params = {} }) => {
    dispach(productGetRequest({ prop, url, params }));
  });

  return { products, onGetProducts };
};

export default useProductSelector;
