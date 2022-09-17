import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authByPropSelector,
  authClear,
  authGetMessageRequest,
  authLogin,
  authPostRequest,
  authSuccess,
} from "slices/authSlice";
import localStorageServices from "utils/localStorageServices";

const useAuthSelector = (prop) => {
  const data = useSelector(authByPropSelector(prop));
  const dispatch = useDispatch();

  const onLogin = useCallback(({ url, body }) => {
    dispatch(authLogin({ prop, url, body }));
  }, []);

  const onLogout = useCallback(() => {
    localStorageServices.remove("auth");
    dispatch(authSuccess({ prop, data: {} }));
  }, []);

  const onPostRequest = useCallback(({ url, body }) => {
    dispatch(authPostRequest({ prop, url, body }));
  }, []);

  const onClear = useCallback(() => {
    dispatch(authClear({ prop }));
  }, []);

  const onGetMessage = useCallback(({ url, body }) => {
    dispatch(authGetMessageRequest({ prop, url, body }));
  }, []);

  return { data, onLogin, onLogout, onPostRequest, onClear, onGetMessage };
};

export default useAuthSelector;
