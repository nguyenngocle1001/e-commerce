import { takeEvery, call, put } from "redux-saga/effects";
import { commonGetRequest, commonSuccess } from "slices/commonSlice";
import { GET } from "../api";

function* handleOnGetData(action) {
  const { prop, url, params = {} } = action.payload;

  try {
    const { docs, pagination } = yield call(GET, { url, params });

    yield put(commonSuccess({ prop, data: { docs, pagination } }));
  } catch (error) {
    console.log({ error });
  }
}

function* commonSaga() {
  yield takeEvery(commonGetRequest.toString(), handleOnGetData);
}

export default commonSaga;
