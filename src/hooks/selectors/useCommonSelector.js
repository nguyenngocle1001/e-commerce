import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commonByPropSelector, commonGetRequest } from "slices/commonSlice";

const useCommonSelector = (prop) => {
  const data = useSelector(commonByPropSelector(prop));
  const dispatch = useDispatch();

  const onGetRequest = useCallback(({ url, params }) => {
    dispatch(commonGetRequest({ url, params, prop }));
  }, []);

  return { data, onGetRequest };
};

export default useCommonSelector;
