import HeaderWithoutCards from 'components/Headers/HeaderWithoutCards';
import React, { useEffect, useState } from 'react';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Col,
	Container,
	FormGroup,
	Input,
	Label,
	Row,
	Spinner,
	FormFeedback,
} from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from './../firebase';
import { toast } from 'react-toastify';

const Rates = () => {
	const [loading, setLoading] = useState(false);
	const [dataLoading, setDataLoading] = useState(true);

	const formik = useFormik({
		initialValues: {
			centralParkTourWeekday: '',
			centralParkTourWeekend: '',
			centralParkTourWeekdayDec: '',
			centralParkTourWeekendDec: '',
			hourlyServicesWeekday: '',
			hourlyServicesWeekend: '',
			hourlyServicesWeekdayDec: '',
			hourlyServicesWeekendDec: '',
			pointAToBWeekday: '',
			pointAToBWeekend: '',
			pointAToBWeekdayDec: '',
			pointAToBWeekendDec: '',
		},
		validationSchema: Yup.object({
			centralParkTourWeekday: Yup.number().required('Required'),
			centralParkTourWeekend: Yup.number().required('Required'),
			centralParkTourWeekdayDec: Yup.number().required('Required'),
			centralParkTourWeekendDec: Yup.number().required('Required'),
			hourlyServicesWeekday: Yup.number().required('Required'),
			hourlyServicesWeekend: Yup.number().required('Required'),
			hourlyServicesWeekdayDec: Yup.number().required('Required'),
			hourlyServicesWeekendDec: Yup.number().required('Required'),
			pointAToBWeekday: Yup.number().required('Required'),
			pointAToBWeekend: Yup.number().required('Required'),
			pointAToBWeekdayDec: Yup.number().required('Required'),
			pointAToBWeekendDec: Yup.number().required('Required'),
		}),
		onSubmit: async values => {
			try {
				setLoading(true);
				let docRef = doc(db, 'rates', 'ratesDoc');
				await setDoc(docRef, values);
				toast.success('Rates updated successfully');
			} catch (err) {
				toast.error(err.message);
			} finally {
				setLoading(false);
			}
		},
	});

	useEffect(() => {
		const fetchRates = async () => {
			let docRef = doc(db, 'rates', 'ratesDoc');
			onSnapshot(docRef, snapshot => {
				formik.setValues(snapshot.data());
				setDataLoading(false);
			});
		};
		fetchRates();
	}, []);

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
								<h3 className='mb-0'>Rates</h3>
							</CardHeader>
							<CardBody>
								{dataLoading ? (
									<div className='py-3 d-flex justify-content-center'>
										<Spinner />
									</div>
								) : (
									<>
										<h3>
											Central Park Tour Operation Rate
										</h3>
										<form onSubmit={formik.handleSubmit}>
											<Row>
												<Col md={6} xl={3}>
													<FormGroup>
														<Label>Weekday</Label>
														<Input
															type='number'
															name='centralParkTourWeekday'
															invalid={
																formik.touched
																	.centralParkTourWeekday &&
																!!formik.errors
																	.centralParkTourWeekday
															}
															value={
																formik.values
																	.centralParkTourWeekday
															}
															onBlur={
																formik.handleBlur
															}
															onChange={
																formik.handleChange
															}
														/>
														<FormFeedback>
															{
																formik.errors
																	.centralParkTourWeekday
															}
														</FormFeedback>
													</FormGroup>
												</Col>
												<Col md={6} xl={3}>
													<FormGroup>
														<Label>Weekend</Label>
														<Input
															type='number'
															name='centralParkTourWeekend'
															invalid={
																formik.touched
																	.centralParkTourWeekend &&
																!!formik.errors
																	.centralParkTourWeekend
															}
															value={
																formik.values
																	.centralParkTourWeekend
															}
															onBlur={
																formik.handleBlur
															}
															onChange={
																formik.handleChange
															}
														/>
														<FormFeedback>
															{
																formik.errors
																	.centralParkTourWeekend
															}
														</FormFeedback>
													</FormGroup>
												</Col>
												<Col md={6} xl={3}>
													<FormGroup>
														<Label>
															Weekday (December)
														</Label>
														<Input
															type='number'
															name='centralParkTourWeekdayDec'
															invalid={
																formik.touched
																	.centralParkTourWeekdayDec &&
																!!formik.errors
																	.centralParkTourWeekdayDec
															}
															value={
																formik.values
																	.centralParkTourWeekdayDec
															}
															onBlur={
																formik.handleBlur
															}
															onChange={
																formik.handleChange
															}
														/>
														<FormFeedback>
															{
																formik.errors
																	.centralParkTourWeekdayDec
															}
														</FormFeedback>
													</FormGroup>
												</Col>
												<Col md={6} xl={3}>
													<FormGroup>
														<Label>
															Weekend (December)
														</Label>
														<Input
															type='number'
															name='centralParkTourWeekendDec'
															invalid={
																formik.touched
																	.centralParkTourWeekendDec &&
																!!formik.errors
																	.centralParkTourWeekendDec
															}
															value={
																formik.values
																	.centralParkTourWeekendDec
															}
															onBlur={
																formik.handleBlur
															}
															onChange={
																formik.handleChange
															}
														/>
														<FormFeedback>
															{
																formik.errors
																	.centralParkTourWeekendDec
															}
														</FormFeedback>
													</FormGroup>
												</Col>
											</Row>
											<h3>Hourly Service</h3>
											<Row>
												<Col md={6} xl={3}>
													<FormGroup>
														<Label>Weekday</Label>
														<Input
															type='number'
															name='hourlyServicesWeekday'
															invalid={
																formik.touched
																	.hourlyServicesWeekday &&
																!!formik.errors
																	.hourlyServicesWeekday
															}
															value={
																formik.values
																	.hourlyServicesWeekday
															}
															onBlur={
																formik.handleBlur
															}
															onChange={
																formik.handleChange
															}
														/>
														<FormFeedback>
															{
																formik.errors
																	.hourlyServicesWeekday
															}
														</FormFeedback>
													</FormGroup>
												</Col>
												<Col md={6} xl={3}>
													<FormGroup>
														<Label>Weekend</Label>
														<Input
															type='number'
															name='hourlyServicesWeekend'
															invalid={
																formik.touched
																	.hourlyServicesWeekend &&
																!!formik.errors
																	.hourlyServicesWeekend
															}
															value={
																formik.values
																	.hourlyServicesWeekend
															}
															onBlur={
																formik.handleBlur
															}
															onChange={
																formik.handleChange
															}
														/>
														<FormFeedback>
															{
																formik.errors
																	.hourlyServicesWeekend
															}
														</FormFeedback>
													</FormGroup>
												</Col>
												<Col md={6} xl={3}>
													<FormGroup>
														<Label>
															Weekday (December)
														</Label>
														<Input
															type='number'
															name='hourlyServicesWeekdayDec'
															invalid={
																formik.touched
																	.hourlyServicesWeekdayDec &&
																!!formik.errors
																	.hourlyServicesWeekdayDec
															}
															value={
																formik.values
																	.hourlyServicesWeekdayDec
															}
															onBlur={
																formik.handleBlur
															}
															onChange={
																formik.handleChange
															}
														/>
														<FormFeedback>
															{
																formik.errors
																	.hourlyServicesWeekdayDec
															}
														</FormFeedback>
													</FormGroup>
												</Col>
												<Col md={6} xl={3}>
													<FormGroup>
														<Label>
															Weekend (December)
														</Label>
														<Input
															type='number'
															name='hourlyServicesWeekendDec'
															invalid={
																formik.touched
																	.hourlyServicesWeekendDec &&
																!!formik.errors
																	.hourlyServicesWeekendDec
															}
															value={
																formik.values
																	.hourlyServicesWeekendDec
															}
															onBlur={
																formik.handleBlur
															}
															onChange={
																formik.handleChange
															}
														/>
														<FormFeedback>
															{
																formik.errors
																	.hourlyServicesWeekendDec
															}
														</FormFeedback>
													</FormGroup>
												</Col>
											</Row>
											<h3>Point A to B Ride</h3>
											<Row>
												<Col md={6} xl={3}>
													<FormGroup>
														<Label>Weekday</Label>
														<Input
															type='number'
															name='pointAToBWeekday'
															invalid={
																formik.touched
																	.pointAToBWeekday &&
																!!formik.errors
																	.pointAToBWeekday
															}
															value={
																formik.values
																	.pointAToBWeekday
															}
															onBlur={
																formik.handleBlur
															}
															onChange={
																formik.handleChange
															}
														/>
														<FormFeedback>
															{
																formik.errors
																	.pointAToBWeekday
															}
														</FormFeedback>
													</FormGroup>
												</Col>
												<Col md={6} xl={3}>
													<FormGroup>
														<Label>Weekend</Label>
														<Input
															type='number'
															name='pointAToBWeekend'
															invalid={
																formik.touched
																	.pointAToBWeekend &&
																!!formik.errors
																	.pointAToBWeekend
															}
															value={
																formik.values
																	.pointAToBWeekend
															}
															onBlur={
																formik.handleBlur
															}
															onChange={
																formik.handleChange
															}
														/>
														<FormFeedback>
															{
																formik.errors
																	.pointAToBWeekend
															}
														</FormFeedback>
													</FormGroup>
												</Col>
												<Col md={6} xl={3}>
													<FormGroup>
														<Label>
															Weekday (December)
														</Label>
														<Input
															type='number'
															name='pointAToBWeekdayDec'
															invalid={
																formik.touched
																	.pointAToBWeekdayDec &&
																!!formik.errors
																	.pointAToBWeekdayDec
															}
															value={
																formik.values
																	.pointAToBWeekdayDec
															}
															onBlur={
																formik.handleBlur
															}
															onChange={
																formik.handleChange
															}
														/>
														<FormFeedback>
															{
																formik.errors
																	.pointAToBWeekdayDec
															}
														</FormFeedback>
													</FormGroup>
												</Col>
												<Col md={6} xl={3}>
													<FormGroup>
														<Label>
															Weekend (December)
														</Label>
														<Input
															type='number'
															name='pointAToBWeekendDec'
															invalid={
																formik.touched
																	.pointAToBWeekendDec &&
																!!formik.errors
																	.pointAToBWeekendDec
															}
															value={
																formik.values
																	.pointAToBWeekendDec
															}
															onBlur={
																formik.handleBlur
															}
															onChange={
																formik.handleChange
															}
														/>
														<FormFeedback>
															{
																formik.errors
																	.pointAToBWeekendDec
															}
														</FormFeedback>
													</FormGroup>
												</Col>
											</Row>
											<Button
												color='primary'
												style={{ width: 200 }}
												type='submit'
												disabled={loading}
											>
												{loading ? (
													<Spinner size='sm' />
												) : (
													'Save'
												)}
											</Button>
										</form>
									</>
								)}
							</CardBody>
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
};

export default Rates;
