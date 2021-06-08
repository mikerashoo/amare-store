import {put, call, all, takeLatest} from 'redux-saga/effects';   
import { showUnitsAction, addUnitAction, removeUnitAction} from "../actions/unitActions";
import { fetchUnitsApi, saveUnitApi, deleteUnitApi } from '../apis/unitsApi';
import { UNITS_ACTION } from '../constants/itemActions';
function* fetchUnitsSaga(){
    try {  
        const unitsData = yield call(fetchUnitsApi);
        yield put (showUnitsAction(unitsData))
    }
    catch (error) {
        console.log('Problem with fetching employees please try again!');
    }
}

function* saveNewUnitSaga(action){ 
    try {  
        const unitData = yield call(saveUnitApi, action.unit);
        yield put (addUnitAction(unitData));
    }
    catch (error) {
        console.log('Problem with fetching employees please try again!');
    }
}

function* deleteUnitSaga(action){ 
    try {  
        const unitData = yield call(deleteUnitApi, action.unit);
        if(unitData){
            yield put (removeUnitAction(action.unit));
        }
    }
    catch (error) {
        console.log('Problem with fetching employees please try again!');
    }
}


function* unitSaga(){
    yield all([
      yield takeLatest(UNITS_ACTION.FETCH_UNITS_ACTION, fetchUnitsSaga),  
      yield takeLatest(UNITS_ACTION.SAVE_UNIT_ACTION, saveNewUnitSaga),  
      yield takeLatest(UNITS_ACTION.DELETE_UNIT_ACTION, deleteUnitSaga),  
    ]) 
  } 
  export default unitSaga;