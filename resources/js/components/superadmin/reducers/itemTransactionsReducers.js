import { ITEM_TRANSACTION_ACTIONS } from "../constants/itemTransactionActions";

const INITIAL_STATE = {
    item: null,
    daily: {
        loading: false,
        transactions: [],
        error: false
    },
    weekly: {
        loading: false,
        transactions: [],
        error: false
    },
    monthly: {
        loading: false,
        transactions: [],
        error: false
    },
}

export const itemTransactionsReducers = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ITEM_TRANSACTION_ACTIONS.FETCH_DAILY_ITEM_TRANSACTIONS_ACTION:
            return {
                ...state,
                daily: {
                    loading: true
                }
            }

        case ITEM_TRANSACTION_ACTIONS.SHOW_DAILY_ITEM_TRANSACTIONS_ACTION: 
            return {
                ...state,
                daily: {
                    loading: false,
                    transactions: action.item.transactions
                },
                item: action.item
            }
        
            
        case ITEM_TRANSACTION_ACTIONS.SHOW_DAILY_ITEM_TRANSACTIONS_ERROR_ACTION:
            return {
                ...state,
                daily: {
                    loading: false,
                    error: action.error
                }
            }

            case ITEM_TRANSACTION_ACTIONS.FETCH_WEEKLY_ITEM_TRANSACTIONS_ACTION:
                return {
                    ...state,
                    weekly: {
                        loading: true
                    }
                }
    
            case ITEM_TRANSACTION_ACTIONS.SHOW_WEEKLY_ITEM_TRANSACTIONS_ACTION: 
                return {
                    ...state,
                    weekly: {
                        loading: false,
                        transactions: action.item.transactions
                    },
                    item: action.item
                }
            
                
            case ITEM_TRANSACTION_ACTIONS.SHOW_WEEKLY_ITEM_TRANSACTIONS_ERROR_ACTION:
                return {
                    ...state,
                    weekly: {
                        loading: false,
                        error: action.error
                    }
                }

        default: 
            return state;
    }
}
