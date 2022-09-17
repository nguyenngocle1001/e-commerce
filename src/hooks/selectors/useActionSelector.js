import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  actionByPropSelector,
  actionClear,
  actionGetRequest,
  actionPostRequest,
} from "slices/actionSlice";

const useActionSelector = (prop) => {
  const data = useSelector(actionByPropSelector(prop));
  const dispatch = useDispatch();

  const onGetAction = useCallback(
    ({ url, params }) => dispatch(actionGetRequest({ url, params, prop })),
    []
  );

  const onPostAction = useCallback(({ url, body, params = {} }) => {
    dispatch(actionPostRequest({ url, params, prop, body }));
  }, []);

  const onClear = useCallback(() => {
    dispatch(actionClear({ prop }));
  }, []);

  return { data, onGetAction, onPostAction, onClear };
};

export default useActionSelector;
