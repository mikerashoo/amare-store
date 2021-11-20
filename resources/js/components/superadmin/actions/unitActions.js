import { UNITS_ACTION, ITEM_PROPERTYS_ACTION } from "../constants/itemActions";

export const fetchUnitsAction = () => ({
    type: UNITS_ACTION.FETCH_UNITS_ACTION
});

export const showUnitsAction = (units) => ({
    type: UNITS_ACTION.SHOW_UNITS_ACTION,
    units
});

export const saveUnitAction = (unit) => ({
    type: UNITS_ACTION.SAVE_UNIT_ACTION,
    unit
});

export const addUnitAction = (unit) => ({
    type: UNITS_ACTION.ADD_UNIT_ACTION,
    unit
});

export const deleteUnitAction = (unit) => ({
    type: UNITS_ACTION.DELETE_UNIT_ACTION,
    unit
});

export const removeUnitAction = (unit) => ({
    type: UNITS_ACTION.REMOVE_UNIT_ACTION,
    unit
});

//
export const fetchItemPropertiesAction = () => ({
    type: ITEM_PROPERTYS_ACTION.FETCH_ITEM_PROPERTIES_ACTION
});

export const showItemPropertiesAction = (item_properties) => ({
    type: ITEM_PROPERTYS_ACTION.SHOW_ITEM_PROPERTIES_ACTION,
    item_properties
});

export const saveItemPropertyAction = (item_property) => ({
    type: ITEM_PROPERTYS_ACTION.SAVE_ITEM_PROPERTY_ACTION,
    item_property
});

export const addItemPropertyAction = (item_property) => ({
    type: ITEM_PROPERTYS_ACTION.ADD_ITEM_PROPERTY_ACTION,
    item_property
});

export const deleteItemPropertyAction = (item_property) => ({
    type: ITEM_PROPERTYS_ACTION.DELETE_ITEM_PROPERTY_ACTION,
    item_property
});

export const removeItemPropertyAction = (item_property) => ({
    type: ITEM_PROPERTYS_ACTION.REMOVE_ITEM_PROPERTY_ACTION,
    item_property
});
