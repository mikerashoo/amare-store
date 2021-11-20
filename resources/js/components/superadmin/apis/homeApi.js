import axios from 'axios';
import { FETCH_TODAYS_LOANS_GIVEN_URL, FETCH_TODAYS_LOANS_PAID_URL, FETCH_TODAYS_SELL_URL } from '../constants/api';

export const fetchTodaysSellApi = async () => {
    const call = await axios.get(FETCH_TODAYS_SELL_URL);
    let response = await call.data;
    return await response;
}

export const fetchTodaysLoanGivenApi = async () => {
    const call = await axios.get(FETCH_TODAYS_LOANS_GIVEN_URL);
    let response = await call.data;
    return await response;
}

export const fetchTodaysLoanPaymentsApi = async () => {
    const call = await axios.get(FETCH_TODAYS_LOANS_PAID_URL);
    let response = await call.data;
    return await response;
}
