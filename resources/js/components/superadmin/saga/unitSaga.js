import { put, call, all, takeLatest } from 'redux-saga/effects';
import { showUnitsAction, addUnitAction, removeUnitAction, showItemPropertiesAction, addItemPropertyAction, removeItemPropertyAction } from "../actions/unitActions";
import { deleteItemPropertyApi, fetchItemPropertiesApi, saveItemPropertiesApi } from '../apis/itemApi';
import { fetchUnitsApi, saveUnitApi, deleteUnitApi } from '../apis/unitsApi';
import { ITEM_PROPERTYS_ACTION, UNITS_ACTION } from '../constants/itemActions';

function* fetchUnitsSaga() {
    try {
        const unitsData = yield call(fetchUnitsApi);
        yield put(showUnitsAction(unitsData))
    }
    catch (error) {
        console.log('Problem with fetching employees please try again!');
    }
}

function* saveNewUnitSaga(action) {
    try {
        const unitData = yield call(saveUnitApi, action.unit);
        yield put(addUnitAction(unitData));
    }
    catch (error) {
        console.log('Problem with fetching employees please try again!');
    }
}

function* deleteUnitSaga(action) {
    try {
        const unitData = yield call(deleteUnitApi, action.unit);
        if (unitData) {
            yield put(removeUnitAction(action.unit));
        }
    }
    catch (error) {
        console.log('Problem with fetching employees please try again!');
    }
}

function* fetchItemPropertiesSaga() {
    try {
        const itemPropertiesData = yield call(fetchItemPropertiesApi);
        yield put(showItemPropertiesAction(itemPropertiesData))
    }
    catch (error) {
        console.log('Problem with fetching employees please try again!');
    }
}

function* saveItemPropertySaga(action) {
    try {
        const itemPropertyData = yield call(saveItemPropertiesApi, action.item_property);
        yield put(addItemPropertyAction(itemPropertyData));
    }
    catch (error) {
        console.log('Problem with fetching employees please try again!');
    }
}

function* deleteItemProperySaga(action) {
    try {
        const itemPropertyData = yield call(deleteItemPropertyApi, action.item_property);
        yield put(removeItemPropertyAction(action.item_property));

    }
    catch (error) {
        console.log('Proble with deleting item data!');
        console.log(error);
    }
}


function* unitSaga() {
    yield all([
        yield takeLatest(UNITS_ACTION.FETCH_UNITS_ACTION, fetchUnitsSaga),
        yield takeLatest(UNITS_ACTION.SAVE_UNIT_ACTION, saveNewUnitSaga),
        yield takeLatest(UNITS_ACTION.DELETE_UNIT_ACTION, deleteUnitSaga),
        yield takeLatest(ITEM_PROPERTYS_ACTION.FETCH_ITEM_PROPERTIES_ACTION, fetchItemPropertiesSaga),
        yield takeLatest(ITEM_PROPERTYS_ACTION.SAVE_ITEM_PROPERTY_ACTION, saveItemPropertySaga),
        yield takeLatest(ITEM_PROPERTYS_ACTION.DELETE_ITEM_PROPERTY_ACTION, deleteItemProperySaga),
    ])
}
export default unitSaga;
