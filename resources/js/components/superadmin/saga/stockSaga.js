import {put, call, all, takeLatest} from 'redux-saga/effects';   
import { showStocksAction, showTransactionsAction, showStocksError, addNewTransactionAction } from "../actions/stockActions";
import { fetchStocksApi, fetchTransactionsApi, saveNewTransactionApi } from '../apis/stockApi';
import { STOCK_ACTIONS } from '../constants/stockActions';

function* fetchStocksSaga(){
    try {  
        const stockData = yield call(fetchStocksApi); 
        yield put (showStocksAction(stockData));
    }
    catch (error) {
        yield put (showStocksError('Problem with fetching employees please try again!'))
    }
}  
function* fetchTransactionsSaga(){
    try {  
        const stockData = yield call(fetchTransactionsApi); 
        yield put (showTransactionsAction(stockData));
    }
    catch (error) {
        yield put (showStocksError('Problem with fetching employees please try again!'))
    }
}  

function* saveStockSaga(action){
    try {  
        const stockData = yield call(saveNewTransactionApi, action.transaction); 
        yield put (addNewTransactionAction(stockData));
    }
    catch (error) {
        yield put (showStocksError('Problem with fetching employees please try again!'))
    }
}  

function* stockSaga(){
    yield all([
      yield takeLatest(STOCK_ACTIONS.FETCH_STOCK_ACTION, fetchStocksSaga),    
      yield takeLatest(STOCK_ACTIONS.FETCH_TRANSACTIONS_ACTION, fetchTransactionsSaga),    
      yield takeLatest(STOCK_ACTIONS.SAVE_NEW_TRANSACTION_ACTION, saveStockSaga),    
    ]) 
  } 
  export default stockSaga;