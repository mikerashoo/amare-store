import { message } from 'antd';
import { put, call, all, takeLatest } from 'redux-saga/effects';
import { showItemAction, showItemErrorAction, addItemAction, removeItemAction, updateItemAction, saveItemErrorAction, fetchItemAction } from "../actions/itemActions";
import { deleteItemApi, fetchItemApi, saveItemApi, updateItemApi } from '../apis/itemApi';
import { ITEM_ACTIONS } from '../constants/itemActions';
const MESSAGE_KEY = "ITEM_REDUCER_KEY";

function* fetchItemSaga(action) {
    try {
        const categoryData = yield call(fetchItemApi, action.id);
        yield put(showItemAction(categoryData))
    }
    catch (error) {
        yield put(showItemErrorAction('Problem with fetching employees please try again!'))
    }
}

function* saveItemSaga(action) {
    try {
        const itemData = yield call(saveItemApi, action.item);
        if (itemData == -1) {
            message.error({ content: "Item with same code already exist! Please use unique code!", key: MESSAGE_KEY });
            yield put(saveItemErrorAction());
        }
        else {
            message.success({ content: "Item saved successfully", key: MESSAGE_KEY });
            yield put(addItemAction(itemData));
        }
    }
    catch (error) {
        yield put(showItemErrorAction({ content: 'Problem with fetching employees please try again!', key: MESSAGE_KEY }))
    }
}

function* updateItemSaga(action) {
    try {
        const itemData = yield call(updateItemApi, action.item);
        if (itemData == -1) {
            message.error({ content: "Item with same code already exist! Please use unique code!", key: MESSAGE_KEY });
            yield put(saveItemErrorAction());
        }
        else {
            console.log("item data", itemData)
            message.success({ content: "Item updated successfully", key: MESSAGE_KEY });
            yield put(fetchItemAction(itemData.category_id));
        }
    }
    catch (error) {
        yield put(showItemErrorAction('Problem with fetching employees please try again!'))
    }
}

function* deleteItemSaga(action) {
    try {
        const itemData = yield call(deleteItemApi, action.item.id);
        yield put(removeItemAction(action.item))
    }
    catch (error) {
        yield put(showItemErrorAction('Problem with fetching employees please try again!'))
    }
}

function* itemSaga() {
    yield all([
        yield takeLatest(ITEM_ACTIONS.FETCH_ITEM_ACTION, fetchItemSaga),
        yield takeLatest(ITEM_ACTIONS.SAVE_ITEM_ACTION, saveItemSaga),
        yield takeLatest(ITEM_ACTIONS.DELETE_ITEM_ACTION, deleteItemSaga),
        yield takeLatest(ITEM_ACTIONS.EDIT_ITEM_ACTION, updateItemSaga),
    ])
}
export default itemSaga;
