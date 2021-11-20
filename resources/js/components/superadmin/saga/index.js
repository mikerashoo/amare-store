import { all } from "redux-saga/effects";
import usersSaga from "./userSaga";
import categorySaga from "./categorySaga";
import unitSaga from "./unitSaga";
import itemSaga from "./itemSaga";
import stockSaga from "./stockSaga";
import itemTransactionsSaga from "./itemTransactionsSaga";
import homeSaga from "./homeSaga";

function* rootSaga() {
    yield all([
        usersSaga(),
        categorySaga(),
        unitSaga(),
        itemSaga(),
        stockSaga(),
        itemTransactionsSaga(),
        homeSaga()
    ]);
}

export default rootSaga;
