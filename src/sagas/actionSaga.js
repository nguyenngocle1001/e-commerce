import { takeEvery, call, put } from "redux-saga/effects";

import { GET, POST } from "api";
import {
  actionGetRequest,
  actionPostRequest,
  actionSuccess,
} from "slices/actionSlice";

function* handleOnGetData(action) {
  const { prop, url, params = {} } = action.payload;

  try {
    const { doc } = yield call(GET, { url, params });

    yield put(actionSuccess({ prop, data: doc }));
  } catch (error) {
    console.log({ error });
  }
}

function* handleOnPostData(action) {
  const { prop, url, body } = action.payload;

  try {
    const { doc } = yield call(POST, { url, body });


    yield put(actionSuccess({ prop, data: doc }));
  } catch (error) {
  }
}

function* actionSaga() {
  yield takeEvery(actionGetRequest.toString(), handleOnGetData);
  yield takeEvery(actionPostRequest.toString(), handleOnPostData);
}

export default actionSaga;
