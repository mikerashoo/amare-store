import { FETCH_DAILY_ITEM_TRANSACTIONS_URL, FETCH_WEEKLY_ITEM_TRANSACTIONS_URL } from "../constants/api";

export const fetchItemDailyTransactionsApi = async (id, date) => {   
    const call = await axios.get(FETCH_DAILY_ITEM_TRANSACTIONS_URL + id + '/' + date); 
    let response = await call.data;  
    console.log("daily response", response);
    return await response;
  }
   
  
export const fetchItemWeeklyTransactionsApi = async (id, date_range) => {   
  const call = await axios.get(FETCH_WEEKLY_ITEM_TRANSACTIONS_URL + id + '/' + date_range); 
  let response = await call.data;  
  console.log("weekly response", response);
  return await response;
}
 