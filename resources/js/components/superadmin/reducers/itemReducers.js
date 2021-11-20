import { message } from "antd";
import { ITEM_ACTIONS } from "../constants/itemActions";

const INITIAL_STATE = {
    loading: false,
    error: null,
    message: null,
    data: null,
    new_item_modal: false
}

const MESSAGE_KEY = "ITEM_REDUCER_KEY";
export const itemReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ITEM_ACTIONS.FETCH_ITEM_ACTION:
            return {
                ...state,
                loading: true
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
            message.loading({ content: 'በመመዝገብ ላይ....', key: MESSAGE_KEY });
            return {
                ...state,
                loading: true,
            }

        case ITEM_ACTIONS.ADD_ITEM_ACTION:
            let items = [...state.data.items];
            items.push(action.item);
            message.success({ content: 'እቃው በትክክል ተመዝግቧል፡፡', key: MESSAGE_KEY });

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

            message.success({ content: 'እቃው በትክክል ተሰዝርዟል', key: MESSAGE_KEY });

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
            message.loading({ content: 'የእቃው መረጃ በማስተካከል', key: MESSAGE_KEY });
            return {
                ...state,
                loading: true,
            }


        case ITEM_ACTIONS.UPDATE_ITEM_ACTION:
            let edit_items = state.data.items;

            edit_items.map(item => {
                if (item.id == action.item.id) {
                    item.name = action.item.name;
                    item.price = action.item.price;
                    item.logo_name = action.item.logo_name;
                }
            });
            message.success({ content: 'የእቃው መረጃ በትክክል ተመዝግቧል፡፡', key: MESSAGE_KEY });

            return {
                ...state,
                loading: false,
                message: 'Item Removed Successfully!',
                data: {
                    ...state.data,
                    items: edit_items
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

        default: return state;
    }
}
