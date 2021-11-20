import { put, call, all, takeLatest } from 'redux-saga/effects';
import { showDailyTransactions, showDailyTransactionsError, showMonthlyTransactions, showMonthlyTransactionsAction, showWeeklyTransactions, showWeeklyTransactionsError } from "../actions/itemTransactionActions";
import { fetchItemDailyTransactionsApi, fetchItemMonthlyTransactionsApi, fetchItemWeeklyTransactionsApi } from '../apis/itemTransactionsApi';
import { ITEM_TRANSACTION_ACTIONS } from '../constants/itemTransactionActions';
function* fetchItemDailyTransactionsSaga(action) {
    try {
        const transactionData = yield call(fetchItemDailyTransactionsApi, action.id, action.date);
        yield put(showDailyTransactions(transactionData))
    }
    catch (error) {
        yield put(showDailyTransactions('Problem with fetching item transactions!'))
    }
}

function* fetchItemWeekyTransactionsSaga(action) {
    try {
        const transactionData = yield call(fetchItemWeeklyTransactionsApi, action.id, action.start_date, action.end_date);
        yield put(showWeeklyTransactions(transactionData))
    }
    catch (error) {
        yield put(showWeeklyTransactionsError('Problem with fetching item transactions!'))
    }
}
function* fetchItemMonthlyTransactionsSaga(action) {
    try {
        const transactionData = yield call(fetchItemMonthlyTransactionsApi, action.id, action.month, action.year);
        yield put(showMonthlyTransactionsAction(transactionData))
    }
    catch (error) {
        yield put(showWeeklyTransactionsError('Problem with fetching item transactions!'))
    }
}

function* itemTransactionsSaga() {
    yield all([
        yield takeLatest(ITEM_TRANSACTION_ACTIONS.FETCH_DAILY_ITEM_TRANSACTIONS_ACTION, fetchItemDailyTransactionsSaga),
        yield takeLatest(ITEM_TRANSACTION_ACTIONS.FETCH_WEEKLY_ITEM_TRANSACTIONS_ACTION, fetchItemWeekyTransactionsSaga),
        yield takeLatest(ITEM_TRANSACTION_ACTIONS.FETCH_MONTHLY_ITEM_TRANSACTIONS_ACTION, fetchItemMonthlyTransactionsSaga),
    ])
}
export default itemTransactionsSaga;
