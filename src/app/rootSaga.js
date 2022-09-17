import { all } from "redux-saga/effects";

import actionSaga from "sagas/actionSaga";
import authSaga from "sagas/authSaga";
import cartSaga from "sagas/cartSaga";
import commonSaga from "sagas/commonSaga";
import detailSaga from "sagas/detailSaga";
import productSaga from "sagas/productSaga";

function* rootSaga() {
  yield all([
    commonSaga(),
    authSaga(),
    productSaga(),
    actionSaga(),
    detailSaga(),
    cartSaga(),
  ]);
}

export default rootSaga;
