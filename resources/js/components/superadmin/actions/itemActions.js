import { ITEM_ACTIONS } from "../constants/itemActions";

export const fetchItemAction = id => ({
    type: ITEM_ACTIONS.FETCH_ITEM_ACTION,
    id
});

export const showItemAction = category => ({
    type: ITEM_ACTIONS.SHOW_ITEM_DETAIL_ACTION,
    category
});

export const showItemErrorAction = (error) => ({
    type: ITEM_ACTIONS.SHOW_ITEM_ERROR_ACTION,
    error
}); 

export const saveItemAction = (item) => ({
    type: ITEM_ACTIONS.SAVE_ITEM_ACTION,
    item
}); 
export const addItemAction = (item) => ({
    type: ITEM_ACTIONS.ADD_ITEM_ACTION,
    item
}); 
export const deleteItemAction = (item) => ({
    type: ITEM_ACTIONS.DELETE_ITEM_ACTION,
    item
}); 
export const removeItemAction = (item) => ({
    type: ITEM_ACTIONS.REMOVE_ITEM_ACTION,
    item
}); 
export const editItemAction = (item) => ({
    type: ITEM_ACTIONS.EDIT_ITEM_ACTION,
    item
}); 
export const updateItemAction = (item) => ({
    type: ITEM_ACTIONS.UPDATE_ITEM_ACTION,
    item
}); 