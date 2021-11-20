import { HOME_ACTIONS } from "../constants/homeActions";

const INITIAL_STATE = {
    data: [],
    loading: false,
    error: null,
    message: null,
    todays_sell: {
        data: [],
        loading: false,
        error: null
    },
    loans_given: {
        data: [],
        loading: false,
        error: null
    },
    loan_payments: {
        data: [],
        loading: false,
        error: null
    }
}
export const homeReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HOME_ACTIONS.FETCH_TODAYS_ITEM_SELL_ACTION:
            return {
                ...state,
                todays_sell: {
                    ...state.todays_sell,
                    loading: true
                }
            }
        case HOME_ACTIONS.SHOW_TODAYS_ITEM_SELL_ACTION:
            return {
                ...state,
                todays_sell: {
                    ...state.todays_sell,
                    data: action.items,
                    loading: false
                }
            }
        case HOME_ACTIONS.SHOW_TODAYS_ITEM_SELL_ERROR_ACTION:
            return {
                ...state,
                todays_sell: {
                    ...state.todays_sell,
                    loading: false,
                    error: action.error
                }
            }
        case HOME_ACTIONS.FETCH_LOANS_GIVEN_ACTION:
            return {
                ...state,
                loans_given: {
                    ...state.loans_given,
                    loading: true
                }
            }
        case HOME_ACTIONS.SHOW_LOANS_GIVEN_ACTION:
            return {
                ...state,
                loans_given: {
                    ...state.loans_given,
                    data: action.loans,
                    loading: false
                }
            }
        case HOME_ACTIONS.SHOW_LOANS_GIVEN_ERROR_ACTION:
            return {
                ...state,
                loans_given: {
                    ...state.loans_given,
                    loading: false,
                    error: action.error
                }
            }

        case HOME_ACTIONS.FETCH_LOANS_PAID_ACTION:
            return {
                ...state,
                loan_payments: {
                    ...state.loan_payments,
                    loading: true
                }
            }
        case HOME_ACTIONS.SHOW_LOANS_PAID_ACTION:
            return {
                ...state,
                loan_payments: {
                    ...state.loan_payments,
                    data: action.payments,
                    loading: false
                }
            }
        case HOME_ACTIONS.SHOW_LOANS_PAID_ERROR_ACTION:
            return {
                ...state,
                loan_payments: {
                    ...state.loan_payments,
                    loading: false,
                    error: action.error
                }
            }
        default: return state;
    }
}
