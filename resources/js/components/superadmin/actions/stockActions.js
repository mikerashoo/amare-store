import { STOCK_ACTIONS } from "../constants/stockActions";

export const fetchStocksAction = () => ({
    type: STOCK_ACTIONS.FETCH_STOCK_ACTION, 
});

export const showStocksAction = categories => ({
    type: STOCK_ACTIONS.SHOW_STOCK_DETAIL_ACTION,
    categories
});

export const fetchTransactionsAction = () => ({
    type: STOCK_ACTIONS.FETCH_TRANSACTIONS_ACTION, 
});

export const showTransactionsAction = transactions => ({
    type: STOCK_ACTIONS.SHOW_TRANSACTIONS_ACTION,
    transactions
});

export const showStocksError = (error) => ({
    type: STOCK_ACTIONS.SHOW_STOCK_ERROR_ACTION,
    error
});  
export const saveNewTransactionAction = (transaction) => ({
    type: STOCK_ACTIONS.SAVE_NEW_TRANSACTION_ACTION,
    transaction
});  

export const addNewTransactionAction = (item) => ({
    type: STOCK_ACTIONS.ADD_NEW_TRANSACTION_ACTION,
    item
});  