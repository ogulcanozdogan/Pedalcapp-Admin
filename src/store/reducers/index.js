import { combineReducers } from 'redux';
import bookingReducer from './bookingReducer';
let rootReducer = combineReducers({
	booking: bookingReducer,
});
export default rootReducer;
