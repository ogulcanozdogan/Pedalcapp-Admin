import HeaderWithoutCards from 'components/Headers/HeaderWithoutCards';
import { db } from '../firebase';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Container,
	Row,
	Spinner,
} from 'reactstrap';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from 'firebase/firestore';
import CustomTable from 'components/CustomTable';
import moment from 'moment';
import BookingDetailsModal from 'components/BookingDetailsModal';

const CustomerHistory = () => {
	let [customer, setCustomer] = useState(null);
	let [bookingDetails, setBookingDetails] = useState(null);
	let params = useParams();
	let navigate = useNavigate();
	let [bookingHistory, setBookingHistory] = useState([]);
	let [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCustomerHistory = async () => {
			try {
				setLoading(true);
				const customerDocRef = doc(db, 'customers', params.id);
				let customerSnapDoc = await getDoc(customerDocRef);
				if (!customerSnapDoc.exists()) {
					toast.error('Customer data not found!');
					navigate('/admin/customers');
					return;
				}
				setCustomer(customerSnapDoc.data());
				let bookingRef = collection(db, 'bookings');
				let queryRes = query(
					bookingRef,
					where('customerId', '==', params.id)
				);

				let bookingSnap = await getDocs(queryRes);
				let bookingHistory = [];
				for (let bookingDoc of bookingSnap.docs) {
					let driverDocRef = doc(
						db,
						'drivers',
						bookingDoc?.data()?.driverId
					);
					let driverSnap = await getDoc(driverDocRef);
					bookingHistory.push({
						bookingId: bookingDoc.id,
						customer: customerSnapDoc.data(),
						driver: driverSnap.data(),
						...bookingDoc.data(),
					});
				}
				setBookingHistory(bookingHistory);
			} catch (err) {
				toast.error(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchCustomerHistory();
	}, []);

	const toggleBookingDetailsModal = (e, bookingDetails = null) => {
		setBookingDetails(bookingDetails);
	};
	return (
		<>
			<HeaderWithoutCards />
			<Container className='mt--7 pb-4' fluid>
				<Row>
					<div className='col'>
						<Card className='shadow'>
							<CardHeader className='bg-transparent d-flex align-items-center'>
								<h3 className='mb-0'>Customer History</h3>
							</CardHeader>
							{loading ? (
								<div className='d-flex py-4 justify-content-center'>
									<Spinner />
								</div>
							) : (
								<>
									<CardBody>
										Showing history for{' '}
										{customer?.firstName}{' '}
										{customer?.lastName}
									</CardBody>
									<CustomTable
										cols={[
											{
												header: 'Booking Number',
												key: 'bookingNumber',
											},
											{
												header: 'Date of Ride',
												key: 'dateOfRide',
											},
											{
												header: 'Time of Ride',
												key: 'timeOfRide',
											},
											{
												header: 'Type of Ride',
												key: 'type',
											},
											{
												header: 'Actions',
												key: 'actions',
											},
										]}
										rows={bookingHistory.map(item => ({
											...item,
											dateOfRide: moment(
												item.dateAndTime.toDate()
											).format('DD/MM/YYYY'),
											timeOfRide: moment(
												item.dateAndTime.toDate()
											).format('hh:mm A'),
											actions: (
												<>
													<Button
														color='primary'
														size='sm'
														onClick={e => {
															toggleBookingDetailsModal(
																e,
																item
															);
														}}
													>
														View Details
													</Button>
												</>
											),
										}))}
									/>
								</>
							)}
						</Card>
					</div>
				</Row>
			</Container>
			<BookingDetailsModal
				isOpen={bookingDetails !== null}
				booking={bookingDetails}
				toggle={toggleBookingDetailsModal}
			/>
		</>
	);
};

export default CustomerHistory;
