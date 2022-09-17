import { takeEvery, call, put } from "redux-saga/effects";

import { DELETE, GET, POST } from "api";
import { CART_API } from "constants/apiPath";

import {
  cartDeleteRequest,
  cartGetRequest,
  cartPostRequest,
  cartSuccess,
} from "slices/cartSlice";

function* handleOnGetData() {
  try {
    const { doc } = yield call(GET, { url: CART_API });

    yield put(cartSuccess({ data: doc }));
  } catch (error) {
    console.log({ error });
  }
}

function* handleOnPostData(action) {
  const { body } = action.payload;

  try {
    yield call(POST, { url: CART_API, body });

    yield handleOnGetData();
  } catch (error) {
    console.log({ error });
  }
}

function* handleOnDeleteData(action) {
  const { url } = action.payload;

  try {
    yield call(DELETE, { url });

    yield handleOnGetData();
  } catch (error) {
    console.log({ error });
  }
}

function* cartSaga() {
  yield takeEvery(cartGetRequest.toString(), handleOnGetData);
  yield takeEvery(cartPostRequest.toString(), handleOnPostData);
  yield takeEvery(cartDeleteRequest.toString(), handleOnDeleteData);
}

export default cartSaga;
