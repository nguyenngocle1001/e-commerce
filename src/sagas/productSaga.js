import { takeEvery, call, put } from "redux-saga/effects";
import { productGetRequest, productSuccess } from "slices/productSlice";
import { GET } from "api";

function* handleOnGetData(action) {
  const { prop, url, params = {} } = action.payload;

  try {
    const { docs, pagination } = yield call(GET, { url, params });

    yield put(productSuccess({ prop, data: { docs, pagination } }));
  } catch (error) {
    console.log({ error });
  }
}

function* productSaga() {
  yield takeEvery(productGetRequest.toString(), handleOnGetData);
}

export default productSaga;
