import CustomTable from 'components/CustomTable';
import HeaderWithoutCards from 'components/Headers/HeaderWithoutCards';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Container, Row } from 'reactstrap';
import BookingDetailsModal from 'components/BookingDetailsModal';
import { useSelector } from 'react-redux';

const Bookings = () => {
	let [bookingDetails, setBookingDetails] = useState(null);

	let { bookings, loading } = useSelector(state => state.booking);

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
								<h3 className='mb-0'>Bookings</h3>
							</CardHeader>
							<CardBody className='px-0 pt-0 pb-0'>
								<CustomTable
									loading={loading}
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
									rows={bookings.map(item => ({
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
							</CardBody>
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

export default Bookings;
