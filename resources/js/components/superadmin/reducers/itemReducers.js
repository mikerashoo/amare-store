import { message } from "antd";
import { ITEM_ACTIONS } from "../constants/itemActions";

const INITIAL_STATE = {
    loading: false,
    error: null,
    message: null,
    data: {
        items: []
    },
    new_item_modal: false,
    edit_item_id: 0
}

const MESSAGE_KEY = "ITEM_REDUCER_KEY";
export const itemReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ITEM_ACTIONS.FETCH_ITEM_ACTION:
            console.log("fetch called");
            return {
                ...state,
                loading: true,
                edit_item_id: 0
            }

        case ITEM_ACTIONS.SHOW_ITEM_DETAIL_ACTION:
            return {
                ...state,
                loading: false,
                data: action.category
            }

        case ITEM_ACTIONS.SHOW_ITEM_ERROR_ACTION:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case ITEM_ACTIONS.SAVE_ITEM_ACTION:
            message.loading({ content: 'Saving please wait....', key: MESSAGE_KEY });
            return {
                ...state,
                loading: true,
            }

        case ITEM_ACTIONS.SAVE_ITEM_ERROR_ACTION:
            return {
                ...state,
                loading: false,
            }

        case ITEM_ACTIONS.ADD_ITEM_ACTION:
            let items = [...state.data.items];
            items.push(action.item);
            return {
                ...state,
                loading: false,
                new_item_modal: false,
                data: {
                    ...state.data,
                    items
                }
            }


        case ITEM_ACTIONS.DELETE_ITEM_ACTION:
            return {
                ...state,
                loading: true,
            }


        case ITEM_ACTIONS.REMOVE_ITEM_ACTION:
            let items_ = [...state.data.items];
            let _items = items_.filter((item, i) => (item.id != action.item.id));

            message.success({ content: 'Item deleted succesfully', key: MESSAGE_KEY });

            return {
                ...state,
                loading: false,
                message: 'Item Removed Successfully!',
                data: {
                    ...state.data,
                    items: _items
                },
            }


        case ITEM_ACTIONS.EDIT_ITEM_ACTION:
            message.loading({ content: 'Updating item information please wait...', key: MESSAGE_KEY });
            return {
                ...state,
                loading: true,
            }


        case ITEM_ACTIONS.UPDATE_ITEM_ACTION:


            return {
                ...state,
                loading: false,
                edit_item_id: 0,
                data: {
                    ...state.data,
                    items: state.data.items.map(item => item.id == action.item.id ? action.item : item)
                },
            }

        case ITEM_ACTIONS.SHOW_NEW_ITEM_MODAL_ACTION:
            return {
                ...state,
                new_item_modal: true
            }

        case ITEM_ACTIONS.HIDE_NEW_ITEM_MODAL_ACTION:
            return {
                ...state,
                new_item_modal: false
            }

        case ITEM_ACTIONS.SHOW_ITEM_EDIT_MODAL_ACTION:
            return {
                ...state,
                edit_item_id: action.id
            }

        case ITEM_ACTIONS.HIDE_ITEM_EDIT_MODAL_ACTION:
            return {
                ...state,
                edit_item_id: 0
            }

        default: return state;
    }
}
