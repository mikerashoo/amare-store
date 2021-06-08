import { UNITS_ACTION } from "../constants/itemActions";

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