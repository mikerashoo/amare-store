import { HOME_ACTIONS } from '../constants/homeActions';

export const fetchTodaysItemSellAction = () => ({
    type: HOME_ACTIONS.FETCH_TODAYS_ITEM_SELL_ACTION
});

export const showTodaysItemSellAction = (items) => ({
    type: HOME_ACTIONS.SHOW_TODAYS_ITEM_SELL_ACTION,
    items
});

export const showTodaysItemSellErrorAction = (error) => ({
    type: HOME_ACTIONS.SHOW_TODAYS_ITEM_SELL_ERROR_ACTION,
    error
});

export const fetchTodaysLoanGivenAction = () => ({
    type: HOME_ACTIONS.FETCH_LOANS_GIVEN_ACTION
});

export const showTodaysLoanGivenAction = (loans) => ({
    type: HOME_ACTIONS.SHOW_LOANS_GIVEN_ACTION,
    loans
});

export const showTodaysLoanGivenErrorAction = (error) => ({
    type: HOME_ACTIONS.SHOW_LOANS_GIVEN_ERROR_ACTION,
    error
});

export const fetchTodaysLoanPaymentAction = () => ({
    type: HOME_ACTIONS.FETCH_LOANS_PAID_ACTION
});

export const showTodaysLoanPaymentAction = (payments) => ({
    type: HOME_ACTIONS.SHOW_LOANS_PAID_ACTION,
    payments
});

export const showTodaysLoanPaymentErrorAction = (error) => ({
    type: HOME_ACTIONS.SHOW_LOANS_PAID_ERROR_ACTION,
    error
});
