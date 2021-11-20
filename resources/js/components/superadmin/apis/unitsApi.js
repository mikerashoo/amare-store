import { FETCH_UNITS_URL, SAVE_UNITS_URL, DELETE_UNITS_URL } from "../constants/api";
import axios from 'axios';
export const fetchUnitsApi = async () => {
    const call = await axios.get(FETCH_UNITS_URL);
    let response = await call.data;
    return await response;
}

export const saveUnitApi = async (unit) => {
    const call = await axios.post(SAVE_UNITS_URL, { unit: unit });
    let response = await call.data;
    return await response;
}

export const deleteUnitApi = async (unit) => {
    const call = await axios.delete(DELETE_UNITS_URL + '/' + unit.id);
    let response = await call.data;
    return await response;
}
