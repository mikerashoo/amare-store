import { ITEM_PROPERTYS_ACTION, UNITS_ACTION } from "../constants/itemActions";

const INITIAL_STATE = {
    data: [],
    loading: false,
    error: null,
    message: null,
    item_properties: []
}

export const unitReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UNITS_ACTION.FETCH_UNITS_ACTION:
            return {
                ...state,
                loading: true,
            }

        case UNITS_ACTION.SHOW_UNITS_ACTION:
            return {
                ...state,
                loading: false,
                data: action.units
            }

        case UNITS_ACTION.SAVE_UNIT_ACTION:
            return {
                ...state,
                loading: true,
            }

        case UNITS_ACTION.ADD_UNIT_ACTION:
            let data = state.data;
            data.push(action.unit);
            return {
                ...state,
                loading: false,
                message: 'New Item Added Successfully!',
                data,
            }

        case UNITS_ACTION.DELETE_UNIT_ACTION:
            return {
                ...state,
                loading: true,
            }

        case UNITS_ACTION.REMOVE_UNIT_ACTION:
            let _data = [...state.data.filter(unit => unit.id != action.unit.id)];
            return {
                ...state,
                loading: false,
                message: 'Unit Removed Successfully!',
                data: _data,
            }

        case ITEM_PROPERTYS_ACTION.FETCH_ITEM_PROPERTIES_ACTION:
            return {
                ...state,
                loading: true,
            }

        case ITEM_PROPERTYS_ACTION.SHOW_ITEM_PROPERTIES_ACTION:
            return {
                ...state,
                loading: false,
                item_properties: action.item_properties
            }

        case ITEM_PROPERTYS_ACTION.SAVE_ITEM_PROPERTY_ACTION:
            return {
                ...state,
                loading: true,
            }

        case ITEM_PROPERTYS_ACTION.ADD_ITEM_PROPERTY_ACTION:
            return {
                ...state,
                loading: false,
                message: 'New Item Property Added Successfully!',
                item_properties: [...state.item_properties, action.item_property],
            }

        case ITEM_PROPERTYS_ACTION.DELETE_ITEM_PROPERTY_ACTION:
            return {
                ...state,
                loading: true,
            }

        case ITEM_PROPERTYS_ACTION.REMOVE_ITEM_PROPERTY_ACTION:
            console.log("remove repos called");
            let _item_properties = [...state.item_properties.filter(item_property => item_property.id != action.item_property.id)];
            return {
                ...state,
                loading: false,
                message: 'Item property removed successfully!',
                item_properties: _item_properties,
            }

        default: return state;
    }
}
