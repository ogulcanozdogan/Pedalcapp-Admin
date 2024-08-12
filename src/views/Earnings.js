import CustomTable from 'components/CustomTable';
import HeaderWithoutCards from 'components/Headers/HeaderWithoutCards';
import moment from 'moment';
import React, { useState } from 'react';
import {
	Card,
	CardBody,
	CardHeader,
	Container,
	Nav,
	NavItem,
	Row,
	NavLink,
	Col,
	Input,
	FormGroup,
	Label,
	CardTitle,
} from 'reactstrap';
import { useSelector } from 'react-redux';

let years = [2024, 2025, 2026];
let months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const EarningsDurationSelector = ({
	year,
	onYearChange,
	month,
	onMonthChange,
}) => {
	return (
		<Row className='mt-4'>
			<Col md={6}>
				<FormGroup>
					<Label>Year</Label>
					<Input
						value={year}
						onChange={e => onYearChange(e.target.value)}
						type='select'
					>
						{years.map(year => (
							<option value={year}>{year}</option>
						))}
					</Input>
				</FormGroup>
			</Col>
			<Col md={6}>
				<FormGroup>
					<Label>Month</Label>
					<Input
						value={month}
						onChange={e => onMonthChange(e.target.value)}
						type='select'
					>
						{months.map((month, monthIdx) => (
							<option value={monthIdx}>{month}</option>
						))}
					</Input>
				</FormGroup>
			</Col>
		</Row>
	);
};

const Earnings = () => {
	const { bookings, loading } = useSelector(state => state.booking);
	let [activeTab, setActiveTab] = useState('admin');
	let [month, setMonth] = useState(
		Number.parseInt(moment(moment.now()).format('MM'))
	);
	let [year, setYear] = useState(
		Number.parseInt(moment(moment.now()).format('YYYY'))
	);

	const getFilteredData = (bookings, month, year) => {
		let data = [];
		for (let booking of bookings) {
			let bookingMonth = moment(booking.dateAndTime.toDate()).format(
				'MM'
			);
			let bookingYear = moment(booking.dateAndTime.toDate()).format(
				'YYYY'
			);
			if (
				Number(bookingMonth) === Number(month) &&
				Number(bookingYear) === Number(year)
			) {
				data.push(booking);
			}
		}
		return data;
	};
	let data = getFilteredData(bookings, month, year);
	return (
		<>
			<HeaderWithoutCards />
			{/* Page content */}
			<Container className='mt--7' fluid>
				{/* Table */}
				<Row>
					<div className='col'>
						<Card className='shadow'>
							<CardHeader className='bg-transparent'>
								<h3 className='mb-0'>Earnings</h3>
							</CardHeader>
							<CardBody className='px-0 pb-0'>
								<Nav tabs>
									<NavItem className='ml-4'>
										<NavLink
											style={{ cursor: 'pointer' }}
											onClick={() =>
												setActiveTab('admin')
											}
											active={activeTab == 'admin'}
										>
											Admin
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink
											style={{ cursor: 'pointer' }}
											onClick={() =>
												setActiveTab('drivers')
											}
											active={activeTab == 'drivers'}
										>
											Drivers
										</NavLink>
									</NavItem>
								</Nav>
								<CardBody className='pb-0'>
									<Row>
										<Col md={6}>
											<EarningsDurationSelector
												year={year}
												onYearChange={setYear}
												month={month}
												onMonthChange={setMonth}
											/>
										</Col>
										<Col md={{ offset: 3, size: 3 }}>
											<Card>
												<CardBody>
													<CardTitle className='m-0'>
														Total Earning in{' '}
														{months[month]}-{year}
													</CardTitle>
													<h2 className='m-0'>
														$
														{data.reduce(
															(prev, dataItem) =>
																prev +
																dataItem.bookingFee,
															0
														)}
													</h2>
												</CardBody>
											</Card>
										</Col>
									</Row>
								</CardBody>
							</CardBody>
							{activeTab === 'admin' ? (
								<CustomTable
									loading={loading}
									cols={[
										{
											header: 'Booking Number',
											key: 'bookingNumber',
										},
										{
											header: 'Amount Earned',
											key: 'bookingFee',
										},
									]}
									rows={data}
								/>
							) : (
								<>
									<hr className='m-0' />
									<CustomTable
										loading={loading}
										cols={[
											{
												header: 'Booking Number',
												key: 'bookingNumber',
											},
											{
												header: 'First Name',
												key: 'driver.firstName',
											},
											{
												header: 'Last Name',
												key: 'driver.lastName',
											},
											{
												header: 'Amount Earned',
												key: 'driverFee',
											},
										]}
										rows={data}
										allowSearch={true}
										searchKeys={[
											'driver.firstName',
											'driver.lastName',
										]}
									/>
								</>
							)}
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
};

export default Earnings;
