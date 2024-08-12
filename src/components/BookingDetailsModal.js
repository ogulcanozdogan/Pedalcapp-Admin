import moment from 'moment';
import React from 'react';
import {
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalHeader,
	Row,
	Col,
} from 'reactstrap';
import Map from './Map';

const BookingDetailsModal = ({ isOpen, toggle, booking }) => {
	return (
		<>
			<Modal centered size='xl' isOpen={isOpen} toggle={toggle}>
				<ModalHeader
					className='border-bottom d-flex align-items-center'
					toggle={toggle}
				>
					Booking Details
				</ModalHeader>
				<ModalBody>
					<Row>
						<Col xs={12}>
							<FormGroup>
								{booking && (
									<Map
										pickupAddressLatLng={
											booking?.startAddressLatLng
										}
										destinationAddressLatLng={
											booking?.finishAddressLatLng
										}
										pickupAddress={booking?.startAddress}
										destinationAddress={
											booking?.finishAddress
										}
									/>
								)}
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Booking Number</Label>
								<Input
									readOnly
									value={booking?.bookingNumber}
								></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Type</Label>
								<Input readOnly value={booking?.type}></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Customer First Name</Label>
								<Input
									readOnly
									value={booking?.customer?.firstName}
								></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Customer Last Name</Label>
								<Input
									readOnly
									value={booking?.customer?.lastName}
								></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Customer Email Address</Label>
								<Input
									readOnly
									value={booking?.customer?.email}
								></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Customer Phone Number</Label>
								<Input
									readOnly
									value={booking?.customer?.phone}
								></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Driver First Name</Label>
								<Input
									readOnly
									value={booking?.driver?.firstName}
								></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Driver Last Name</Label>
								<Input
									readOnly
									value={booking?.driver?.lastName}
								></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Driver Email Address</Label>
								<Input
									readOnly
									value={booking?.driver?.email}
								></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Driver Phone Number</Label>
								<Input
									readOnly
									value={booking?.driver?.phone}
								></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Number Of Passengers</Label>
								<Input
									readOnly
									value={booking?.numberOfPassengers}
								></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Date</Label>
								<Input
									readOnly
									value={moment(
										booking?.dateAndTime.toDate()
									).format('DD/MM/YYYY')}
								></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Time</Label>
								<Input
									readOnly
									value={moment(
										booking?.dateAndTime.toDate()
									).format('hh:mm A')}
								></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Pick Up Duration</Label>
								<Input
									readOnly
									value={booking?.pickupDuration}
								></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Return Duration</Label>
								<Input
									readOnly
									value={booking?.returnDuration}
								></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Operation Duration</Label>
								<Input
									readOnly
									value={booking?.operationDuration}
								></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Hub</Label>
								<Input readOnly value={booking?.hub}></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Operation Rate</Label>
								<Input
									readOnly
									value={booking?.operationRate}
								></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Operation Fare</Label>
								<Input
									readOnly
									value={booking?.operationFare}
								></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Start Address</Label>
								<Input
									readOnly
									value={booking?.startAddress}
								></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Finish Address</Label>
								<Input
									readOnly
									value={booking?.finishAddress}
								></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Booking Fee</Label>
								<Input
									readOnly
									value={booking?.bookingFee}
								></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Driver Fare</Label>
								<Input
									readOnly
									value={booking?.driverFee}
								></Input>
							</FormGroup>
						</Col>
						<Col md={6} lg={4} xl={3}>
							<FormGroup>
								<Label>Total Fare</Label>
								<Input
									readOnly
									value={booking?.totalFee}
								></Input>
							</FormGroup>
						</Col>
					</Row>
				</ModalBody>
			</Modal>
		</>
	);
};

export default BookingDetailsModal;
