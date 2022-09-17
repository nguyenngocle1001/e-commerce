import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  detailByPropSelector,
  detailGetRequest,
  detailManyGetRequest,
  detailSuccess,
} from "slices/detailSlice";

const useDetailSelector = (prop) => {
  const data = useSelector(detailByPropSelector(prop));
  const dispatch = useDispatch();

  const onGetDetail = useCallback(({ url, params }) => {
    dispatch(detailGetRequest({ prop, url, params }));
  }, []);

  const onGetDetailMany = useCallback(({ url, params }) => {
    dispatch(detailManyGetRequest({ prop, url, params }));
  }, []);

  const onClear = useCallback(() => {
    dispatch(detailSuccess({ prop, data: {} }));
  });

  return { data, onGetDetail, onClear, onGetDetailMany };
};

export default useDetailSelector;
