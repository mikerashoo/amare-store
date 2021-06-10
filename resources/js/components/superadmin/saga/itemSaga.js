import {put, call, all, takeLatest} from 'redux-saga/effects';   
import { showItemAction, showItemErrorAction, addItemAction,removeItemAction, updateItemAction } from "../actions/itemActions";
import { deleteItemApi, fetchItemApi, saveItemApi, updateItemApi } from '../apis/itemApi';
import { ITEM_ACTIONS } from '../constants/itemActions';
function* fetchItemSaga(action){
    try {  
        const categoryData = yield call(fetchItemApi, action.id); 
        yield put (showItemAction(categoryData))
    }
    catch (error) {
        yield put (showItemErrorAction('Problem with fetching employees please try again!'))
    }
}

function* saveItemSaga(action){
    try {  
        const itemData = yield call(saveItemApi, action.item); 
        yield put (addItemAction(itemData))
    }
    catch (error) {
        yield put (showItemErrorAction('Problem with fetching employees please try again!'))
    }
}

function* updateItemSaga(action){
    try {   
        const itemData = yield call(updateItemApi, action.item); 
        yield put (updateItemAction(itemData))
    }
    catch (error) {
        yield put (showItemErrorAction('Problem with fetching employees please try again!'))
    }
}

function* deleteItemSaga(action){
    try {  
        const itemData = yield call(deleteItemApi, action.item.id); 
        yield put (removeItemAction(action.item))
    }
    catch (error) {
        yield put (showItemErrorAction('Problem with fetching employees please try again!'))
    }
}

function* itemSaga(){
    yield all([
      yield takeLatest(ITEM_ACTIONS.FETCH_ITEM_ACTION, fetchItemSaga),   
      yield takeLatest(ITEM_ACTIONS.SAVE_ITEM_ACTION, saveItemSaga),   
      yield takeLatest(ITEM_ACTIONS.DELETE_ITEM_ACTION, deleteItemSaga),   
      yield takeLatest(ITEM_ACTIONS.EDIT_ITEM_ACTION, updateItemSaga),   
    ]) 
  } 
  export default itemSaga;