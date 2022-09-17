import { POST } from "api";
import { takeEvery, call, put } from "redux-saga/effects";
import {
  authFailure,
  authGetMessageRequest,
  authLogin,
  authPostRequest,
  authSuccess,
} from "slices/authSlice";
import localStorageServices from "utils/localStorageServices";

function* handlePostRequest(action) {
  const { prop, url, body } = action.payload;

  try {
    const { user, token } = yield call(POST, { url, body });
    yield put(authSuccess({ prop, data: { user, token } }));
  } catch (error) {
    yield put(authFailure({ prop, error: error.data.message }));
  }
}

function* handleOnLogin(action) {
  const { prop, url, body } = action.payload;

  try {
    const { user, token } = yield call(POST, { url, body });

    localStorageServices.set("auth", { user, token });
    yield put(authSuccess({ prop, data: { user, token } }));
  } catch (error) {
    yield put(authFailure({ prop, error: error.data.message }));
  }
}

function* handleGetMessageRequest(action) {
  const { prop, url, body } = action.payload;

  try {
    const { message } = yield call(POST, { url, body });

    yield put(authSuccess({ prop, data: { message } }));
  } catch (error) {
    yield put(authFailure({ prop, error: error.data.message }));
  }
}

function* authSaga() {
  yield takeEvery(authPostRequest.toString(), handlePostRequest);
  yield takeEvery(authLogin.toString(), handleOnLogin);
  yield takeEvery(authGetMessageRequest.toString(), handleGetMessageRequest);
}

export default authSaga;
