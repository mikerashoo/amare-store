import {put, call, all, takeLatest} from 'redux-saga/effects';   
import { showDailyTransactions, showDailyTransactionsError, showWeeklyTransactions, showWeeklyTransactionsError } from "../actions/itemTransactionActions";
import { fetchItemDailyTransactionsApi, fetchItemWeeklyTransactionsApi } from '../apis/itemTransactionsApi';
import { ITEM_TRANSACTION_ACTIONS } from '../constants/itemTransactionActions';
function* fetchItemDailyTransactionsSaga(action){
    try {  
        console.log('saga action', action);
        const transactionData = yield call(fetchItemDailyTransactionsApi, action.id, action.date); 
        yield put (showDailyTransactions(transactionData))
    }
    catch (error) {
        yield put (showDailyTransactions('Problem with fetching item transactions!'))
    }
} 

function* fetchItemWeekyTransactionsSaga(action){
    try {  
        console.log('weekly saga action', action);
        const transactionData = yield call(fetchItemWeeklyTransactionsApi, action.id, action.start_date, action.end_date); 
        yield put (showWeeklyTransactions(transactionData))
    }
    catch (error) {
        yield put (showWeeklyTransactionsError('Problem with fetching item transactions!'))
    }
} 

function* itemTransactionsSaga(){
    yield all([
      yield takeLatest(ITEM_TRANSACTION_ACTIONS.FETCH_DAILY_ITEM_TRANSACTIONS_ACTION, fetchItemDailyTransactionsSaga),   
      yield takeLatest(ITEM_TRANSACTION_ACTIONS.FETCH_WEEKLY_ITEM_TRANSACTIONS_ACTION, fetchItemWeekyTransactionsSaga),   
    ]) 
  } 
  export default itemTransactionsSaga;