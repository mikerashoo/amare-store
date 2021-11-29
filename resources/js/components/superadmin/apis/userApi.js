import { DELETE_USER_URL, FETCH_USERS_URL, SAVE_NEW_USER } from "../constants/api";
import axios from 'axios';
export const fetchUsersApi = async () => {
    const call = await axios.get(FETCH_USERS_URL);
    let response = await call.data;
    return await response;
}

export const saveNewUserApi = async (user) => {
    const call = await axios.post(SAVE_NEW_USER, user);
    let response = await call.data;
    console.log(response);
    return await response;
}

export const deleteUserApi = async (id) => {
    const call = await axios.delete(DELETE_USER_URL + id);
    let response = await call.data;
    console.log(response);
    return await response;
}
