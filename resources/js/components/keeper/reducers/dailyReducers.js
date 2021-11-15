import { DAILY_ACTIONS } from "../constants/dailyActions";
import { message } from "antd";
const INITIAL_STATE = {
    loading: false,
    error: null,
    message: null,
    data: {
        item_transactions: [],
        sells: [],
        total_loan_payment: 0
    },
}
export const dailyReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case DAILY_ACTIONS.FETCH_DAILY_SELL_TRANSACTIONS:
            return {
                ...state,
                loading: true
            }

        case DAILY_ACTIONS.SHOW_DAILY_SELL_TRANSACTIONS:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    item_transactions: action.item_transactions
                }
            }
        case DAILY_ACTIONS.FETCH_DAILY_SELLS:
            return {
                ...state,
                loading: true
            }

        case DAILY_ACTIONS.DELETE_SELL_ACTION:
            return {
                ...state,
                loading: true
            }

        case DAILY_ACTIONS.REMOVE_SELL_ACTION:
            let sells = state.data.sells.filter((sell, s) => (sell.id != action.id));
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    sells
                }
            }
        case DAILY_ACTIONS.SHOW_DAILY_SELLS:
            return {
                ...state,
                loading: false,
                data: {
                    ...state.data,
                    sells: action.sells
                }
            }

        case DAILY_ACTIONS.SHOW_DAILY_SELL_TRANSACTIONS_ERROR:
            return {
                ...state,
                loading: true
            }

        case DAILY_ACTIONS.SET_TOTAL_LOAN_PAYMENTS_ON_DATE:
            return {
                ...state,
                data: {
                    ...state.data,
                    total_loan_payment: action.total
                }
            }


        default: return state;
    }
}
