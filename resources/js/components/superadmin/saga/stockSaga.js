import { put, call, all, takeLatest } from 'redux-saga/effects';
import { showStocksAction, showTransactionsAction, showStocksError, addNewTransactionAction, saveNewItemSellSuccessAction, saveNewItemBuySuccessAction } from "../actions/stockActions";
import { fetchStocksApi, fetchTransactionsApi, saveNewItemsBuyApi, saveNewTransactionApi } from '../apis/stockApi';
import { STOCK_ACTIONS } from '../constants/stockActions';

function* fetchStocksSaga() {
    try {
        const stockData = yield call(fetchStocksApi);
        yield put(showStocksAction(stockData));
    }
    catch (error) {
        yield put(showStocksError('Problem with fetching stock data please try again!'))
    }
}
function* fetchTransactionsSaga() {
    try {
        const stockData = yield call(fetchTransactionsApi);
        yield put(showTransactionsAction(stockData));
    }
    catch (error) {
        yield put(showStocksError('Problem with fetching transaction please try again!'))
    }
}

function* saveStockSaga(action) {
    try {
        const stockData = yield call(saveNewTransactionApi, action.transaction);
        yield put(addNewTransactionAction(stockData));
    }
    catch (error) {
        yield put(showStocksError('Problem with saving stock please try again!'))
    }
}
function* saveItemsBuySaga(action) {
    try {
        const stockData = yield call(saveNewItemsBuyApi, action.item_buy_transactions);
        console.log("buy data", stockData);
        yield put(saveNewItemBuySuccessAction(stockData));
    }
    catch (error) {
        yield put(showStocksError('Saving buy information failed!'))
    }
}

function* stockSaga() {
    yield all([
        yield takeLatest(STOCK_ACTIONS.FETCH_STOCK_ACTION, fetchStocksSaga),
        yield takeLatest(STOCK_ACTIONS.FETCH_TRANSACTIONS_ACTION, fetchTransactionsSaga),
        yield takeLatest(STOCK_ACTIONS.SAVE_NEW_TRANSACTION_ACTION, saveStockSaga),
        yield takeLatest(STOCK_ACTIONS.SAVE_NEW_ITEMS_BUY_ACTION, saveItemsBuySaga),
    ])
}
export default stockSaga;
