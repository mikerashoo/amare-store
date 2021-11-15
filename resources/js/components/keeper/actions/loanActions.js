import { LOAN_MANAGEMENT_ACTIONS } from '../constants/loanActions';

export const fetchUnpaidLoansAction = () => ({
    type: LOAN_MANAGEMENT_ACTIONS.FETCH_UNPAID_LOANS_ACTION,
});

export const showUnpaidLoansAction = (loans) => ({
    type: LOAN_MANAGEMENT_ACTIONS.SHOW_UNPAID_LOANS_ACTION,
    loans
});

export const showUnpaidLoansErrorAction = (error) => ({
    type: LOAN_MANAGEMENT_ACTIONS.SHOW_UNPAID_LOANS_ERROR_ACTION,
    error
});

export const saveLoanPaymentAction = (payment) => ({
    type: LOAN_MANAGEMENT_ACTIONS.SAVE_LOAN_PAYMENT_ACTION,
    payment
});

export const addLoanPaymentAction = (payment) => ({
    type: LOAN_MANAGEMENT_ACTIONS.ADD_LOAN_PAYMENT_ACTION,
    payment
});

export const fetchTodaysLoanPaymentsAction = (user_id) => ({
    type: LOAN_MANAGEMENT_ACTIONS.FETCH_TODAYS_LOAN_PAYMENTS_ACTION,
    user_id
});

export const showLoanPaymentsAction = (payments) => ({
    type: LOAN_MANAGEMENT_ACTIONS.SHOW_LOAN_PAYMENTS_ACTION,
    payments
});
