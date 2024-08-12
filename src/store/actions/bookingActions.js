import { collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { GET_BOOKINGS, SET_BOOKING_LOADING } from '../types';
import { db } from '../../firebase';

export const fetchBookings = () => async dispatch => {
	const collectionRef = collection(db, 'bookings');
	dispatch({ type: SET_BOOKING_LOADING, payload: true });
	onSnapshot(collectionRef, async snapshot => {
		let bookings = [];
		for (let snapshotDoc of snapshot.docs) {
			let data = snapshotDoc.data();
			let driverDocRef = doc(db, 'drivers', data.driverId);
			let driverSnap = await getDoc(driverDocRef);
			let customerDocRef = doc(db, 'customers', data.customerId);
			let customerSnap = await getDoc(customerDocRef);
			bookings.push({
				id: snapshotDoc.id,
				...data,
				driver: driverSnap.data(),
				customer: customerSnap.data(),
			});
		}
		dispatch({ type: SET_BOOKING_LOADING, payload: false });
		dispatch({ type: GET_BOOKINGS, payload: bookings });
	});
};
