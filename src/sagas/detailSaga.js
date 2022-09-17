import { takeEvery, call, put } from "redux-saga/effects";
import { GET } from "api";
import {
  detailFailure,
  detailGetRequest,
  detailManyGetRequest,
  detailSuccess,
} from "slices/detailSlice";

function* handleOnGetData(action) {
  const { prop, url, params = {} } = action.payload;

  try {
    const { doc } = yield call(GET, { url, params });

    yield put(detailSuccess({ prop, data: { doc } }));
  } catch (error) {
    yield put(detailFailure({ prop, error: error.data.message }));
  }
}

function* handleOnGetDataMany(action) {
  const { prop, url, params = {} } = action.payload;

  try {
    const { docs } = yield call(GET, { url, params });

    yield put(detailSuccess({ prop, data: { docs } }));
  } catch (error) {
    yield put(detailFailure({ prop, error: error.data.message }));
  }
}

function* detailSaga() {
  yield takeEvery(detailGetRequest.toString(), handleOnGetData);
  yield takeEvery(detailManyGetRequest.toString(), handleOnGetDataMany);
}

export default detailSaga;
