import { DELETE_SELL_URL, FETCH_LOAN_PAYMENTS_ON_DATE_URL, FETCH_SELLS_ON_DATE_URL, FETCH_SELL_TRANSACTIONS_ON_DATE_URL } from "../constants/api";
import axios from 'axios';

export const fetchDailySellTransactionsApi = async (date) => {
    const call = await axios.get(FETCH_SELL_TRANSACTIONS_ON_DATE_URL + date);
    let response = await call.data;
    return await response;
}

export const fetchDailySellsApi = async (date) => {
    const call = await axios.get(FETCH_SELLS_ON_DATE_URL + date);
    let response = await call.data;
    return await response;
}

export const deleteSellApi = async (id) => {
    const call = await axios.delete(DELETE_SELL_URL + id);
    let response = await call.data;
    return await response;
}


export const fetchtLoanPaymentsOnDateApi = async (date, user_id) => {
    const url = FETCH_LOAN_PAYMENTS_ON_DATE_URL + date + '/' + user_id;
    const call = await axios.get(url);
    let response = await call.data;
    return await response;
}

