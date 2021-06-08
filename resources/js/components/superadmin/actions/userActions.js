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

export const saveNewUserToDBAction = (user)=> ({
    type: USER_ACTIONS.SAVE_NEW_USER_TO_DB_ACTION,
    user
});

export const addNewUserAction = (user)=> ({
    type: USER_ACTIONS.ADD_NEW_USER_ACTION,
    user
});