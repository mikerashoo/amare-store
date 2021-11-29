import {
    USER_ACTIONS
} from '../constants/userActions';

export const fetchUsersAction = () => ({
    type: USER_ACTIONS.FETCH_USERS_ACTION
});

export const showUsersAction = (users) => ({
    type: USER_ACTIONS.SHOW_USERS_ACTION,
    users
});

export const showUsersErrorAction = (error) => ({
    type: USER_ACTIONS.SHOW_USERS_ERROR_ACTION,
    error
});

export const saveNewUserToDBAction = (user) => ({
    type: USER_ACTIONS.SAVE_NEW_USER_TO_DB_ACTION,
    user
});

export const addNewUserAction = (user) => ({
    type: USER_ACTIONS.ADD_NEW_USER_ACTION,
    user
});

export const saveEditUserAction = (user) => ({
    type: USER_ACTIONS.SAVE_EDIT_USER_ACTION,
    user
});

export const showEditUsersAction = (id) => ({
    type: USER_ACTIONS.SHOW_EDIT_USER_MODAL_ACTION,
    id
});

export const hideEditUserAction = () => ({
    type: USER_ACTIONS.SHOW_EDIT_USER_MODAL_ACTION
});

export const deleteUserAction = (id) => ({
    type: USER_ACTIONS.DELETE_USER_ACTION,
    id
});

export const deleteUseSuccessAction = () => ({
    type: USER_ACTIONS.DELETE_USER_SUCCESS_ACTION,
});
