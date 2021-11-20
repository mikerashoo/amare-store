import { FETCH_DAILY_ITEM_TRANSACTIONS_URL, FETCH_MONTHLY_ITEM_TRANSACTIONS_URL, FETCH_WEEKLY_ITEM_TRANSACTIONS_URL } from "../constants/api";

export const fetchItemDailyTransactionsApi = async (id, date) => {
    const call = await axios.get(FETCH_DAILY_ITEM_TRANSACTIONS_URL + id + '/' + date);
    let response = await call.data;
    return await response;
}

export const fetchItemWeeklyTransactionsApi = async (id, start_date, end_date) => {
    const call = await axios.get(FETCH_WEEKLY_ITEM_TRANSACTIONS_URL + id + '/' + start_date + '/' + end_date);
    let response = await call.data;
    return await response;
}

export const fetchItemMonthlyTransactionsApi = async (id, month, year) => {
    const call = await axios.get(FETCH_MONTHLY_ITEM_TRANSACTIONS_URL + id + '/' + month + '/' + year);
    let response = await call.data;
    return await response;
}
