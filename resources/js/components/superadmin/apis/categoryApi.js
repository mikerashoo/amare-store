import { DELETE_ITEM_CATEGORIES_URL, FETCH_ITEM_CATEGORIES_URL, SAVE_ITEM_CATEGORIES_URL } from "../constants/api";
import axios from 'axios';
export const fetchItemCategoriesApi = async () => {
    const call = await axios.get(FETCH_ITEM_CATEGORIES_URL);
    let response = await call.data;
    return await response;
}

export const saveItemCategoryApi = async (category) => {
    const call = await axios.post(SAVE_ITEM_CATEGORIES_URL, { name: category.name, properties: category.properties, code: category.code });
    let response = await call.data;
    return await response;
}

export const deleteItemCategoryApi = async (category) => {
    const call = await axios.delete(DELETE_ITEM_CATEGORIES_URL + "/" + category.id);
    let response = await call.data;
    return await response;
}
