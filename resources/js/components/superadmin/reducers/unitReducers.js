import { UNITS_ACTION } from "../constants/itemActions";

const INITIAL_STATE = {
	data: [],
	loading: false,
	error: null,
	message: null, 
}
export const unitReducers = (state = INITIAL_STATE, action) => {
	switch(action.type){
		case UNITS_ACTION.FETCH_UNITS_ACTION:
		return {
			...state,
			loading: true,
		}
		
		case UNITS_ACTION.SHOW_UNITS_ACTION: 
		return {
			...state,
			loading: false,
			data: action.units
		} 
		
		case UNITS_ACTION.SAVE_UNIT_ACTION: 
		return {
			...state,
			loading: true, 
		}
		
		case UNITS_ACTION.ADD_UNIT_ACTION: 
		let data = state.data;
		data.push(action.unit);  
		return {
			...state,
			loading: false,
			message: 'New Item Added Successfully!',
			data,
		}
		
		case UNITS_ACTION.DELETE_UNIT_ACTION: 
		return {
			...state,
			loading: true, 
		}
		
		case UNITS_ACTION.REMOVE_UNIT_ACTION: 
		let _data = [...state.data.filter(unit => unit.id != action.unit.id)];  
		console.log(_data);
		return {
			...state,
			loading: false,
			message: 'Unit Removed Successfully!',
			data: _data,
		}
		
		default: return state;
	}
}