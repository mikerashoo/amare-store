import { ITEM_CATEGORIES_ACTIONS } from "../constants/itemActions";

const INITIAL_STATE = { 
    data: [],
    loading: false,
    error: null,
    message: null,    
}
export const categoryReducers = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ITEM_CATEGORIES_ACTIONS.FETCH_ITEM_CATEGORIES_ACTION:
        return {
            ...state,  
            loading: true 
        }
        case ITEM_CATEGORIES_ACTIONS.SHOW_ITEM_CATEGORIES_ACTION: 
        return {
            ...state, 
            loading: false,
            data: action.categories
        }
        case ITEM_CATEGORIES_ACTIONS.SHOW_ITEM_CATEGORIES_ERROR_ACTION: 
        return {
            ...state,  
            loading: false,
            error: action.error
        }
        
        case ITEM_CATEGORIES_ACTIONS.SAVE_ITEM_CATEGORY_ACTION:  
        return {
            ...state,  
            loading: true, 
        }

        case ITEM_CATEGORIES_ACTIONS.ADD_ITEM_CATEGORY_ACTION: 
        console.log(action.category);
        let data = [...state.data];
        data.push(action.category);
        return {
            ...state,  
            loading: false, 
            data
        }

        case ITEM_CATEGORIES_ACTIONS.DELETE_ITEM_CATEGORY_ACTION:  
        return {
            ...state,  
            loading: true, 
        }

        case ITEM_CATEGORIES_ACTIONS.REMOVE_ITEM_CATEGORY_ACTION: 
		let _data = [...state.data.filter(category => category.id != action.category.id)]; 
        return {
            ...state,  
            loading: false, 
            data: _data
        }
        
        
        default: return state;
    }
}