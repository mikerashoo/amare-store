import { SAVE_LOAN_PAYMENT_URL, FETCH_UNPAID_LOANS_URL, FETCH_LOAN_PAYMENTS_URL, FETCH_TODAYS_LOAN_PAYMENTS, FETCH_TODAYS_LOAN_PAYMENTS_URL } from "../constants/api";
import axios from 'axios';

export const fetchUnpaidLoansApi = async () => {
    const call = await axios.get(FETCH_UNPAID_LOANS_URL);
    let response = await call.data;
    return await response;
}

export const saveLoanPaymentApi = async (payment) => {
    const call = await axios.post(SAVE_LOAN_PAYMENT_URL, payment);
    let response = await call.data;
    return await response;
}

export const fetchtTodaysLoanPaymentsApi = async (user_id) => {
    const call = await axios.get(FETCH_TODAYS_LOAN_PAYMENTS_URL + user_id);
    let response = await call.data;
    return await response;
}
