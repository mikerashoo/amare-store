import { ITEM_TRANSACTION_ACTIONS } from "../constants/itemTransactionActions";

const INITIAL_STATE = {
    item: null,
    daily: {
        loading: false,
        sell_transactions: [],
        buy_transactions: [],
        error: false
    },
    weekly: {
        loading: false,
        sell_transactions: [],
        buy_transactions: [],
        error: false
    },
    monthly: {
        loading: false,
        sell_transactions: [],
        buy_transactions: [],
        error: false
    },
}

export const itemTransactionsReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ITEM_TRANSACTION_ACTIONS.FETCH_DAILY_ITEM_TRANSACTIONS_ACTION:
            return {
                ...state,
                daily: {
                    ...state.daily,
                    loading: true
                }
            }

        case ITEM_TRANSACTION_ACTIONS.SHOW_DAILY_ITEM_TRANSACTIONS_ACTION:
            return {
                ...state,
                daily: {
                    ...state.daily,
                    loading: false,
                    sell_transactions: action.item.sell_transactions,
                    buy_transactions: action.item.buy_transactions,
                },
                item: action.item
            }


        case ITEM_TRANSACTION_ACTIONS.SHOW_DAILY_ITEM_TRANSACTIONS_ERROR_ACTION:
            return {
                ...state,
                daily: {
                    ...state.daily,
                    loading: false,
                    error: action.error
                }
            }

        case ITEM_TRANSACTION_ACTIONS.FETCH_WEEKLY_ITEM_TRANSACTIONS_ACTION:
            return {
                ...state,
                weekly: {
                    ...state.weekly,
                    loading: true
                }
            }

        case ITEM_TRANSACTION_ACTIONS.SHOW_WEEKLY_ITEM_TRANSACTIONS_ACTION:
            console.log("reducer", action.item);
            return {
                ...state,
                weekly: {
                    ...state.weekly,
                    loading: false,
                    sell_transactions: action.item.sell_transactions,
                    buy_transactions: action.item.buy_transactions,
                },
                item: action.item
            }


        case ITEM_TRANSACTION_ACTIONS.SHOW_WEEKLY_ITEM_TRANSACTIONS_ERROR_ACTION:
            return {
                ...state,
                weekly: {
                    ...state.weekly,
                    loading: false,
                    error: action.error
                }
            }

        case ITEM_TRANSACTION_ACTIONS.FETCH_MONTHLY_ITEM_TRANSACTIONS_ACTION:
            return {
                ...state,
                monthly: {
                    ...state.monthly,
                    loading: true
                }
            }

        case ITEM_TRANSACTION_ACTIONS.SHOW_MONTHLY_ITEM_TRANSACTIONS_ACTION:
            return {
                ...state,
                monthly: {
                    ...state.monthly,
                    loading: false,
                    sell_transactions: action.item.sell_transactions,
                    buy_transactions: action.item.buy_transactions,
                },
                item: action.item
            }

        default:
            return state;
    }
}
