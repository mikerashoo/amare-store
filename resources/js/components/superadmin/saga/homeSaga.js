import { put, call, all, takeLatest } from 'redux-saga/effects';
import { showTodaysItemSellAction, showTodaysItemSellErrorAction, showTodaysLoanGivenAction, showTodaysLoanGivenErrorAction, showTodaysLoanPaymentAction, showTodaysLoanPaymentErrorAction } from '../actions/homeActions';
import { fetchTodaysLoanGivenApi, fetchTodaysLoanPaymentsApi, fetchTodaysSellApi } from '../apis/homeApi';
import { HOME_ACTIONS } from '../constants/homeActions';

function* fetchTodaysSellSaga() {
    try {
        const itemsData = yield call(fetchTodaysSellApi);
        yield put(showTodaysItemSellAction(itemsData))
    }
    catch (error) {
        yield put(showTodaysItemSellErrorAction('Problem with fetching sells!'))
    }
}

function* fetchTodaysLoansGivenSaga() {
    try {
        const loanData = yield call(fetchTodaysLoanGivenApi);
        yield put(showTodaysLoanGivenAction(loanData))
    }
    catch (error) {
        yield put(showTodaysLoanGivenErrorAction('Problem with fetching loans!'))
    }
}

function* fetchTodaysLoanPaymentsSaga() {
    try {
        const paymentData = yield call(fetchTodaysLoanPaymentsApi);
        yield put(showTodaysLoanPaymentAction(paymentData))
    }
    catch (error) {
        yield put(showTodaysLoanPaymentErrorAction('Problem with fetching payments!'))
    }
}


function* homeSaga() {
    yield all([
        yield takeLatest(HOME_ACTIONS.FETCH_TODAYS_ITEM_SELL_ACTION, fetchTodaysSellSaga),
        yield takeLatest(HOME_ACTIONS.FETCH_LOANS_GIVEN_ACTION, fetchTodaysLoansGivenSaga),
        yield takeLatest(HOME_ACTIONS.FETCH_LOANS_PAID_ACTION, fetchTodaysLoanPaymentsSaga),
    ])
}
export default homeSaga;
