import { put, call, all, takeLatest } from 'redux-saga/effects';
import { addLoanPaymentAction, showUnpaidLoansAction, showUnpaidLoansErrorAction, showLoanPaymentsAction } from "../actions/loanActions";
import { fetchUnpaidLoansApi, saveLoanPaymentApi, fetchtTodaysLoanPaymentsApi } from '../apis/loanApi';
import { LOAN_MANAGEMENT_ACTIONS } from '../constants/loanActions';

function* fetchUnpaidLoansSaga() {
    try {
        const loansData = yield call(fetchUnpaidLoansApi);
        yield put(showUnpaidLoansAction(loansData));
    }
    catch (error) {
        yield put(showUnpaidLoansErrorAction('Problem with fetching unpaid loans. please try again!'))
    }
}

function* saveLoanPaymentSaga(action) {
    try {
        const loansData = yield call(saveLoanPaymentApi, action.payment);
        console.log(loansData);
        yield put(addLoanPaymentAction(loansData));
    }
    catch (error) {
        yield put(showUnpaidLoansErrorAction('Problem with saving unpaid loans. please try again!'))
    }
}

function* fetchTodaysLoanPaymentsSaga(action) {
    try {
        const paymentsData = yield call(fetchtTodaysLoanPaymentsApi, action.user_id);
        yield put(showLoanPaymentsAction(paymentsData));
    }
    catch (error) {
        yield put(showUnpaidLoansErrorAction('Problem with saving unpaid loans. please try again!'))
    }
}

function* loanSaga() {
    yield all([
        yield takeLatest(LOAN_MANAGEMENT_ACTIONS.FETCH_UNPAID_LOANS_ACTION, fetchUnpaidLoansSaga),
        yield takeLatest(LOAN_MANAGEMENT_ACTIONS.SAVE_LOAN_PAYMENT_ACTION, saveLoanPaymentSaga),
        yield takeLatest(LOAN_MANAGEMENT_ACTIONS.FETCH_TODAYS_LOAN_PAYMENTS_ACTION, fetchTodaysLoanPaymentsSaga),
    ])
}
export default loanSaga;
