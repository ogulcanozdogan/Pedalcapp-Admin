import { GET_BOOKINGS, SET_BOOKING_LOADING } from '../types';

const initialState = {
	bookings: [],
	loading: false,
};

export default function bookingReducer(state = initialState, action) {
	let { type, payload } = action;
	switch (type) {
		case GET_BOOKINGS:
			return {
				...state,
				bookings: payload,
			};
		case SET_BOOKING_LOADING:
			return {
				...state,
				loading: payload,
			};
		default:
			return {
				...state,
			};
	}
}
