import { ITEM_TRANSACTION_ACTIONS } from "../constants/itemTransactionActions";

export const fetchDailyTransactions = (id, date) => ({
    type: ITEM_TRANSACTION_ACTIONS.FETCH_DAILY_ITEM_TRANSACTIONS_ACTION,
    id,
    date
});

export const showDailyTransactions = item => ({
    type: ITEM_TRANSACTION_ACTIONS.SHOW_DAILY_ITEM_TRANSACTIONS_ACTION,
    item
});

export const showDailyTransactionsError = error => ({
    type: ITEM_TRANSACTION_ACTIONS.SHOW_DAILY_ITEM_TRANSACTIONS_ERROR_ACTION,
    error
});


export const fetchWeeklyTransactions = (id, start_date, end_date) => ({
    type: ITEM_TRANSACTION_ACTIONS.FETCH_WEEKLY_ITEM_TRANSACTIONS_ACTION,
    id,
    start_date,
    end_date
});

export const showWeeklyTransactions = item => ({
    type: ITEM_TRANSACTION_ACTIONS.SHOW_WEEKLY_ITEM_TRANSACTIONS_ACTION,
    item
});

export const showWeeklyTransactionsError = error => ({
    type: ITEM_TRANSACTION_ACTIONS.SHOW_WEEKLY_ITEM_TRANSACTIONS_ERROR_ACTION,
    error
});


export const fetchMonthlyTransactionsAction = (id, month, year) => ({
    type: ITEM_TRANSACTION_ACTIONS.FETCH_MONTHLY_ITEM_TRANSACTIONS_ACTION,
    id,
    month,
    year
});

export const showMonthlyTransactionsAction = item => ({
    type: ITEM_TRANSACTION_ACTIONS.SHOW_MONTHLY_ITEM_TRANSACTIONS_ACTION,
    item
});
