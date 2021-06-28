import { FETCH_STOCK_ITEMS_URL, FETCH_WEEKLY_TRANSACTIONS_URL, SAVE_NEW_TRANSACTION_URL } from "../constants/api";
import axios from 'axios'; 

export const fetchStocksApi = async () => {   
  const call = await axios.get(FETCH_STOCK_ITEMS_URL); 
  let response = await call.data;  
  return await response;
} 
 
export const fetchTransactionsApi = async () => {   
  const call = await axios.get(FETCH_WEEKLY_TRANSACTIONS_URL); 
  let response = await call.data;  
  return await response;
} 
 
export const saveNewTransactionApi = async (transaction) => {   
  const call = await axios.post(SAVE_NEW_TRANSACTION_URL, transaction); 
  let response = await call.data;  
  return await response;
} 
 