import { DELETE_ITEM_PROPERTIES_URL, DELETE_ITEM_URL, FETCH_ITEM_CATEGORY_DETAIL_URL, FETCH_ITEM_PROPERTIES_URL, SAVE_ITEM_PROPERTIES_URL, SAVE_ITEM_URL, UPDATE_ITEM_URL } from "../constants/api";
import axios from 'axios';

export const fetchItemApi = async (id) => {
    const call = await axios.get(FETCH_ITEM_CATEGORY_DETAIL_URL + id);
    let response = await call.data;
    return await response;
}

export const saveItemApi = async (item) => {
    const call = await axios.post(SAVE_ITEM_URL, item);
    let response = await call.data;
    return await response;
}

export const updateItemApi = async (item) => {
    const call = await axios.post(UPDATE_ITEM_URL, item);
    let response = await call.data;
    console.log(response);

    return await response;
}

export const deleteItemApi = async (id) => {
    const call = await axios.delete(DELETE_ITEM_URL + id);
    let response = await call.data;
    return await response;
}

export const fetchItemPropertiesApi = async () => {
    const call = await axios.get(FETCH_ITEM_PROPERTIES_URL);
    let response = await call.data;
    return await response;
}

export const saveItemPropertiesApi = async (property) => {
    const call = await axios.post(SAVE_ITEM_PROPERTIES_URL, { name: property.name, unit_id: property.unit_id });
    let response = await call.data;
    return await response;
}

export const deleteItemPropertyApi = async (property) => {
    const call = await axios.delete(DELETE_ITEM_PROPERTIES_URL + '/' + property.id);
    let response = await call.data;
    return await response;
}
