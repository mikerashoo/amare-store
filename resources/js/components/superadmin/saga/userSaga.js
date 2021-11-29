import { message } from 'antd';
import { put, call, all, takeLatest } from 'redux-saga/effects';
import { addNewUserAction, fetchUsersAction, showUsersAction, showUsersErrorAction } from "../actions/userActions";
import { fetchUsersApi, saveNewUserApi, updateUserApi } from '../apis';
import { deleteUserApi } from '../apis/userApi';
import { USER_ACTIONS } from '../constants/userActions';
function* fetchUsersSaga() {
    try {
        const usersData = yield call(fetchUsersApi);
        yield put(showUsersAction(usersData))
    }
    catch (error) {
        yield put(showUsersErrorAction('Problem with fetching employees please try again!'))
    }
}

function* saveNewUserSaga(action) {
    try {
        const usersData = yield call(saveNewUserApi, action.user);
        yield put(addNewUserAction(usersData));
    }
    catch (error) {
        yield put(showUsersErrorAction('Problem with fetching employees please try again!'))
    }

}

function* updateUserSaga(action) {
    try {
        const usersData = yield call(updateUserApi, action.user);
        message.success({ content: "User information updated succesfullyy" });
        yield put(fetchUsersAction());
    }
    catch (error) {
        yield put(showUsersErrorAction('Problem with fetching employees please try again!'))
    }
}

function* deleteUserSaga(action) {
    try {
        const usersData = yield call(deleteUserApi, action.id);
        message.success({ content: `User ${usersData} succesfully` });
        yield put(fetchUsersAction());
    }
    catch (error) {
        yield put(showUsersErrorAction('Problem with fetching employees please try again!'))
    }
}




function* usersSaga() {
    yield all([
        yield takeLatest(USER_ACTIONS.FETCH_USERS_ACTION, fetchUsersSaga),
        yield takeLatest(USER_ACTIONS.SAVE_NEW_USER_TO_DB_ACTION, saveNewUserSaga),
        yield takeLatest(USER_ACTIONS.SAVE_EDIT_USER_ACTION, updateUserSaga),
        yield takeLatest(USER_ACTIONS.DELETE_USER_ACTION, deleteUserSaga),
    ])
}
export default usersSaga;
