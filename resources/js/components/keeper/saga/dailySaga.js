import { put, call, all, takeLatest } from 'redux-saga/effects';
import {
    removeSellAction,
    setTotalLoanPaymentOnDateAction,
    showDailySellsAction,
    showDailyTransactionsAction,
    showDailyTransactionsErrorAction
} from "../actions/dailyActions";
import { fetchDailySellsApi, fetchDailySellTransactionsApi, deleteSellApi, fetchtLoanPaymentsOnDateApi } from '../apis/dailyApi';
import { DAILY_ACTIONS } from '../constants/dailyActions';

function* fetchDailyItemTransactionsSaga(action) {
    try {
        const sellsData = yield call(fetchDailySellTransactionsApi, action.date);
        yield put(showDailyTransactionsAction(sellsData));
    }
    catch (error) {
        yield put(showDailyTransactionsErrorAction('Problem with fetching daily transactions please try again!'))
    }
}

function* fetchDailySellsSaga(action) {
    try {
        const sellsData = yield call(fetchDailySellsApi, action.date);
        yield put(showDailySellsAction(sellsData));
    }
    catch (error) {
        yield put(showDailyTransactionsErrorAction('Problem with fetching daily transactions please try again!'))
    }
}

function* fetchTotalLoanPaymentsOnDateSaga(action) {
    try {
        const loanToal = yield call(fetchtLoanPaymentsOnDateApi, action.date, window.user.id);
        // console.log("Loan total on saga", loanToal);
        yield put(setTotalLoanPaymentOnDateAction(loanToal));
    }
    catch (error) {
        yield put(showDailyTransactionsErrorAction('Problem with fetching daily transactions please try again!'))
    }
}

function* deleteSellSaga(action) {
    try {
        const sellsData = yield call(deleteSellApi, action.id);
        yield put(removeSellAction(action.id));
    }
    catch (error) {
        yield put(showDailyTransactionsErrorAction('Problem with fetching daily transactions please try again!'))
    }
}


function* dailySaga() {
    yield all([
        yield takeLatest(DAILY_ACTIONS.FETCH_DAILY_SELL_TRANSACTIONS, fetchDailyItemTransactionsSaga),
        yield takeLatest(DAILY_ACTIONS.FETCH_DAILY_SELLS, fetchDailySellsSaga),
        yield takeLatest(DAILY_ACTIONS.DELETE_SELL_ACTION, deleteSellSaga),
        yield takeLatest(DAILY_ACTIONS.FETCH_TOTAL_LOAN_PAYMENTS_ON_DATE, fetchTotalLoanPaymentsOnDateSaga),
    ])
}
export default dailySaga;
