import {put, call, all, takeLatest} from 'redux-saga/effects';   
import { addNewUserAction, showUsersAction, showUsersErrorAction } from "../actions/userActions";
import { fetchUsersApi, saveNewUserApi } from '../apis';
import { USER_ACTIONS } from '../constants/userActions';
function* fetchUsersSaga(){
    try {  
        const usersData = yield call(fetchUsersApi);
        yield put (showUsersAction(usersData))
    }
    catch (error) {
        yield put (showUsersErrorAction('Problem with fetching employees please try again!'))
    }
}

function* saveNewUserSaga(action){ 
    try {  
        const usersData = yield call(saveNewUserApi, action.user);
        yield put (addNewUserAction(usersData));
    }
    catch (error) {
        yield put (showUsersErrorAction('Problem with fetching employees please try again!'))
    }

}


function* usersSaga(){
    yield all([
      yield takeLatest(USER_ACTIONS.FETCH_USERS_ACTION, fetchUsersSaga),  
      yield takeLatest(USER_ACTIONS.SAVE_NEW_USER_TO_DB_ACTION, saveNewUserSaga),  
    ]) 
  } 
  export default usersSaga;