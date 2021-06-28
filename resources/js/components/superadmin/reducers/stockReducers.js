import { STOCK_ACTIONS } from "../constants/stockActions";
import { message } from "antd";
const INITIAL_STATE = {  
    loading: false,
    error: null,
    message: null,
    data: {
        categories: [],
        transactions: []
    }, 
}
export const stockReducers = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case STOCK_ACTIONS.FETCH_STOCK_ACTION:
        return {
            ...state, 
            loading: true 
        }

        case STOCK_ACTIONS.SHOW_STOCK_DETAIL_ACTION:  
        return {
            ...state, 
            loading: false,
            data: {...state.data, 
                categories: action.categories 
            }
        }
        
        case STOCK_ACTIONS.FETCH_TRANSACTIONS_ACTION:
        return {
            ...state, 
            loading: true 
        }

        case STOCK_ACTIONS.SHOW_TRANSACTIONS_ACTION:  
        console.log('transactions =>', action.transactions);
        return {
            ...state, 
            loading: false,
            data: {
                ...state.data, 
                transactions: action.transactions 
            }
        }
        
        case STOCK_ACTIONS.SHOW_STOCK_ERROR_ACTION: 
        return {
            ...state, 
            loading: false,
            error: action.error
        }   
        
        case STOCK_ACTIONS.SAVE_NEW_TRANSACTION_ACTION: 
        return {
            ...state, 
            loading: true, 
        }   
        
        case STOCK_ACTIONS.ADD_NEW_TRANSACTION_ACTION: 
        let categories = state.data.categories;
        categories.map(category => {category.items.map(item => {if(item.id == action.item.id){ 
            item.remaining = action.item.remaining;
        }})}); 
        message.success("Stock transaction is successful");
        return {
            ...state, 
            loading: false, 
            data: {
                ...state.data,
                categories
            }
        }   
        
        default: return state;
    }
}