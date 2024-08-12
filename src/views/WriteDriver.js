// src/WriteDriver.js

import HeaderWithoutCards from 'components/Headers/HeaderWithoutCards';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import {
	Card,
	CardBody,
	CardHeader,
	Col,
	Container,
	FormFeedback,
	FormGroup,
	Input,
	Label,
	Row,
	Button,
	Spinner,
} from 'reactstrap';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../firebase';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

const WriteDriver = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const params = useParams();
	let isEdit = location.pathname.includes('edit');
	let isView = location.pathname.includes('view');
	let [driverDataLoading, setDriverDataLoading] = useState(isEdit || isView);
	let [loading, setLoading] = useState(false);
	const validationSchema = Yup.object({
		firstName: Yup.string().required('First Name is required'),
		lastName: Yup.string().required('Last Name is required'),
		licenseNumber: Yup.string().required('License Number is required'),
		licenseExpiry: Yup.date().required('License Expiry is required'),
		phone: Yup.string().required('Phone is required'),
		email: Yup.string()
			.email('Invalid email address')
			.required('Email is required'),
		streetAddress: Yup.string().required('Street Address is required'),
		apartmentNumber: Yup.string(),
		city: Yup.string().required('City is required'),
		state: Yup.string().required('State is required'),
		zipCode: Yup.string().required('Zip Code is required'),
		businessName: Yup.string().required('Business Name is required'),
		businessLicenseNumber: Yup.string().required(
			'Business License Number is required'
		),
		businessRegistrationNumber: Yup.string().required(
			'Business Registration Number is required'
		),
		businessLicenseExpiry: Yup.date().required(
			'Business License Expiry is required'
		),
		businessPhone: Yup.string().required('Business Phone is required'),
		businessEmail: Yup.string()
			.email('Invalid email address')
			.required('Business Email is required'),
		businessStreetAddress: Yup.string().required(
			'Business Street Address is required'
		),
		businessApartmentNumber: Yup.string(),
		businessCity: Yup.string().required('Business City is required'),
		businessState: Yup.string().required('Business State is required'),
		businessZipCode: Yup.string().required('Business Zip Code is required'),
	});

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			licenseNumber: '',
			licenseExpiry: '',
			phone: '',
			email: '',
			streetAddress: '',
			apartmentNumber: '',
			city: '',
			state: '',
			zipCode: '',
			businessName: '',
			businessLicenseNumber: '',
			businessRegistrationNumber: '',
			businessLicenseExpiry: '',
			businessPhone: '',
			businessEmail: '',
			businessStreetAddress: '',
			businessApartmentNumber: '',
			businessCity: '',
			businessState: '',
			businessZipCode: '',
		},
		validationSchema: validationSchema,
		onSubmit: async values => {
			try {
				setLoading(true);
				let message = 'Driver added successfully.';
				if (isEdit) {
					let docRef = doc(db, 'drivers', params.id);
					await updateDoc(docRef, {
						...values,
						modifiedAt: new Date(),
					});
					message = 'Driver updated successfully.';
					navigate('/admin/drivers');
				} else {
					let collectionRef = collection(db, 'drivers');
					await addDoc(collectionRef, {
						...values,
						status: 'Active',
						createdAt: new Date(),
						modifiedAt: new Date(),
					});
				}
				formik.resetForm();
				toast.success(message);
			} catch (err) {
				toast.error(err.message);
			} finally {
				setLoading(false);
			}
		},
	});

	useEffect(() => {
		if (isEdit || isView) {
			const getDriverData = async () => {
				let docRef = doc(db, 'drivers', params.id);
				const docSnap = await getDoc(docRef);
				if (!docSnap.exists()) {
					toast.error('User Not Found');
					navigate('/admin/drivers');
				}
				formik.setValues(docSnap.data());
				setDriverDataLoading(false);
			};
			getDriverData();
		}
	}, []);

	return (
		<>
			<HeaderWithoutCards />
			<Container className='mt--7 pb-4' fluid>
				<Row>
					<div className='col'>
						<Card className='shadow'>
							<CardHeader className='bg-transparent d-flex align-items-center'>
								<div className='d-flex align-items-center'>
									<Button
										tag={Link}
										to='/admin/drivers'
										color='dark'
									>
										<i class='fas fa-angle-left'></i>
									</Button>
									<h3 className='mb-0 ml-2'>
										{isEdit
											? 'Update'
											: isView
											? 'View'
											: 'Add'}{' '}
										Driver
									</h3>
								</div>
							</CardHeader>
							<CardBody>
								{driverDataLoading ? (
									<div className='d-flex justify-content-center'>
										<Spinner />
									</div>
								) : (
									<form onSubmit={formik.handleSubmit}>
										<h2>Personal Information</h2>
										<Row>
											<Col
												xs={12}
												sm={6}
												md={12}
												lg={4}
												xl={3}
											>
												<FormGroup>
													<Label>First Name</Label>
													<Input
														disabled={isView}
														invalid={
															formik.touched
																.firstName &&
															!!formik.errors
																.firstName
														}
														value={
															formik.values
																.firstName
														}
														type='text'
														name='firstName'
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
																.firstName
														}
													</FormFeedback>
												</FormGroup>
											</Col>
											<Col
												xs={12}
												sm={6}
												md={12}
												lg={4}
												xl={3}
											>
												<FormGroup>
													<Label>Last Name</Label>
													<Input
														disabled={isView}
														invalid={
															formik.touched
																.lastName &&
															!!formik.errors
																.lastName
														}
														value={
															formik.values
																.lastName
														}
														type='text'
														name='lastName'
														onBlur={
															formik.handleBlur
														}
														onChange={
															formik.handleChange
														}
													/>
													<FormFeedback>
														{formik.errors.lastName}
													</FormFeedback>
												</FormGroup>
											</Col>
											<Col
												xs={12}
												sm={6}
												md={12}
												lg={4}
												xl={3}
											>
												<FormGroup>
													<Label>
														License Number
													</Label>
													<Input
														disabled={isView}
														invalid={
															formik.touched
																.licenseNumber &&
															!!formik.errors
																.licenseNumber
														}
														value={
															formik.values
																.licenseNumber
														}
														type='text'
														name='licenseNumber'
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
																.licenseNumber
														}
													</FormFeedback>
												</FormGroup>
											</Col>
											<Col
												xs={12}
												sm={6}
												md={12}
												lg={4}
												xl={3}
											>
												<FormGroup>
													<Label>
														License Expiry
													</Label>
													<Input
														disabled={isView}
														invalid={
															formik.touched
																.licenseExpiry &&
															!!formik.errors
																.licenseExpiry
														}
														value={
															formik.values
																.licenseExpiry
														}
														type='date'
														name='licenseExpiry'
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
																.licenseExpiry
														}
													</FormFeedback>
												</FormGroup>
											</Col>
											<Col
												xs={12}
												sm={6}
												md={12}
												lg={4}
												xl={3}
											>
												<FormGroup>
													<Label>Phone</Label>
													<Input
														disabled={isView}
														invalid={
															formik.touched
																.phone &&
															!!formik.errors
																.phone
														}
														value={
															formik.values.phone
														}
														type='text'
														name='phone'
														onBlur={
															formik.handleBlur
														}
														onChange={
															formik.handleChange
														}
													/>
													<FormFeedback>
														{formik.errors.phone}
													</FormFeedback>
												</FormGroup>
											</Col>
											<Col
												xs={12}
												sm={6}
												md={12}
												lg={4}
												xl={3}
											>
												<FormGroup>
													<Label>Email</Label>
													<Input
														disabled={isView}
														invalid={
															formik.touched
																.email &&
															!!formik.errors
																.email
														}
														value={
															formik.values.email
														}
														type='email'
														name='email'
														onBlur={
															formik.handleBlur
														}
														onChange={
															formik.handleChange
														}
													/>
													<FormFeedback>
														{formik.errors.email}
													</FormFeedback>
												</FormGroup>
											</Col>
											<Col
												xs={12}
												sm={6}
												md={12}
												lg={4}
												xl={3}
											>
												<FormGroup>
													<Label>
														Street Address
													</Label>
													<Input
														disabled={isView}
														invalid={
															formik.touched
																.streetAddress &&
															!!formik.errors
																.streetAddress
														}
														value={
															formik.values
																.streetAddress
														}
														type='text'
														name='streetAddress'
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
																.streetAddress
														}
													</FormFeedback>
												</FormGroup>
											</Col>
											<Col
												xs={12}
												sm={6}
												md={12}
												lg={4}
												xl={3}
											>
												<FormGroup>
													<Label>
														Apartment Number
													</Label>
													<Input
														disabled={isView}
														invalid={
															formik.touched
																.apartmentNumber &&
															!!formik.errors
																.apartmentNumber
														}
														value={
															formik.values
																.apartmentNumber
														}
														type='text'
														name='apartmentNumber'
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
																.apartmentNumber
														}
													</FormFeedback>
												</FormGroup>
											</Col>
											<Col
												xs={12}
												sm={6}
												md={12}
												lg={4}
												xl={3}
											>
												<FormGroup>
													<Label>City</Label>
													<Input
														disabled={isView}
														invalid={
															formik.touched
																.city &&
															!!formik.errors.city
														}
														value={
															formik.values.city
														}
														type='text'
														name='city'
														onBlur={
															formik.handleBlur
														}
														onChange={
															formik.handleChange
														}
													/>
													<FormFeedback>
														{formik.errors.city}
													</FormFeedback>
												</FormGroup>
											</Col>
											<Col
												xs={12}
												sm={6}
												md={12}
												lg={4}
												xl={3}
											>
												<FormGroup>
													<Label>State</Label>
													<Input
														disabled={isView}
														invalid={
															formik.touched
																.state &&
															!!formik.errors
																.state
														}
														value={
															formik.values.state
														}
														type='text'
														name='state'
														onBlur={
															formik.handleBlur
														}
														onChange={
															formik.handleChange
														}
													/>
													<FormFeedback>
														{formik.errors.state}
													</FormFeedback>
												</FormGroup>
											</Col>
											<Col
												xs={12}
												sm={6}
												md={12}
												lg={4}
												xl={3}
											>
												<FormGroup>
													<Label>Zip Code</Label>
													<Input
														disabled={isView}
														invalid={
															formik.touched
																.zipCode &&
															!!formik.errors
																.zipCode
														}
														value={
															formik.values
																.zipCode
														}
														type='text'
														name='zipCode'
														onBlur={
															formik.handleBlur
														}
														onChange={
															formik.handleChange
														}
													/>
													<FormFeedback>
														{formik.errors.zipCode}
													</FormFeedback>
												</FormGroup>
											</Col>
										</Row>
										<h2>Business Information</h2>
										<Row>
											<Col
												xs={12}
												sm={6}
												md={12}
												lg={4}
												xl={3}
											>
												<FormGroup>
													<Label>Business Name</Label>
													<Input
														disabled={isView}
														invalid={
															formik.touched
																.businessName &&
															!!formik.errors
																.businessName
														}
														value={
															formik.values
																.businessName
														}
														type='text'
														name='businessName'
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
																.businessName
														}
													</FormFeedback>
												</FormGroup>
											</Col>
											<Col
												xs={12}
												sm={6}
												md={12}
												lg={4}
												xl={3}
											>
												<FormGroup>
													<Label>
														Business License Number
													</Label>
													<Input
														disabled={isView}
														invalid={
															formik.touched
																.businessLicenseNumber &&
															!!formik.errors
																.businessLicenseNumber
														}
														value={
															formik.values
																.businessLicenseNumber
														}
														type='text'
														name='businessLicenseNumber'
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
																.businessLicenseNumber
														}
													</FormFeedback>
												</FormGroup>
											</Col>
											<Col
												xs={12}
												sm={6}
												md={12}
												lg={4}
												xl={3}
											>
												<FormGroup>
													<Label>
														Business Registration
														Number
													</Label>
													<Input
														disabled={isView}
														invalid={
															formik.touched
																.businessRegistrationNumber &&
															!!formik.errors
																.businessRegistrationNumber
														}
														value={
															formik.values
																.businessRegistrationNumber
														}
														type='text'
														name='businessRegistrationNumber'
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
																.businessRegistrationNumber
														}
													</FormFeedback>
												</FormGroup>
											</Col>
											<Col
												xs={12}
												sm={6}
												md={12}
												lg={4}
												xl={3}
											>
												<FormGroup>
													<Label>
														Business License Expiry
													</Label>
													<Input
														disabled={isView}
														invalid={
															formik.touched
																.businessLicenseExpiry &&
															!!formik.errors
																.businessLicenseExpiry
														}
														value={
															formik.values
																.businessLicenseExpiry
														}
														type='date'
														name='businessLicenseExpiry'
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
																.businessLicenseExpiry
														}
													</FormFeedback>
												</FormGroup>
											</Col>
											<Col
												xs={12}
												sm={6}
												md={12}
												lg={4}
												xl={3}
											>
												<FormGroup>
													<Label>
														Business Phone
													</Label>
													<Input
														disabled={isView}
														invalid={
															formik.touched
																.businessPhone &&
															!!formik.errors
																.businessPhone
														}
														value={
															formik.values
																.businessPhone
														}
														type='text'
														name='businessPhone'
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
																.businessPhone
														}
													</FormFeedback>
												</FormGroup>
											</Col>
											<Col
												xs={12}
												sm={6}
												md={12}
												lg={4}
												xl={3}
											>
												<FormGroup>
													<Label>
														Business Email
													</Label>
													<Input
														disabled={isView}
														invalid={
															formik.touched
																.businessEmail &&
															!!formik.errors
																.businessEmail
														}
														value={
															formik.values
																.businessEmail
														}
														type='email'
														name='businessEmail'
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
																.businessEmail
														}
													</FormFeedback>
												</FormGroup>
											</Col>
											<Col
												xs={12}
												sm={6}
												md={12}
												lg={4}
												xl={3}
											>
												<FormGroup>
													<Label>
														Business Street Address
													</Label>
													<Input
														disabled={isView}
														invalid={
															formik.touched
																.businessStreetAddress &&
															!!formik.errors
																.businessStreetAddress
														}
														value={
															formik.values
																.businessStreetAddress
														}
														type='text'
														name='businessStreetAddress'
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
																.businessStreetAddress
														}
													</FormFeedback>
												</FormGroup>
											</Col>
											<Col
												xs={12}
												sm={6}
												md={12}
												lg={4}
												xl={3}
											>
												<FormGroup>
													<Label>
														Business Apartment
														Number
													</Label>
													<Input
														disabled={isView}
														invalid={
															formik.touched
																.businessApartmentNumber &&
															!!formik.errors
																.businessApartmentNumber
														}
														value={
															formik.values
																.businessApartmentNumber
														}
														type='text'
														name='businessApartmentNumber'
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
																.businessApartmentNumber
														}
													</FormFeedback>
												</FormGroup>
											</Col>
											<Col
												xs={12}
												sm={6}
												md={12}
												lg={4}
												xl={3}
											>
												<FormGroup>
													<Label>Business City</Label>
													<Input
														disabled={isView}
														invalid={
															formik.touched
																.businessCity &&
															!!formik.errors
																.businessCity
														}
														value={
															formik.values
																.businessCity
														}
														type='text'
														name='businessCity'
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
																.businessCity
														}
													</FormFeedback>
												</FormGroup>
											</Col>
											<Col
												xs={12}
												sm={6}
												md={12}
												lg={4}
												xl={3}
											>
												<FormGroup>
													<Label>
														Business State
													</Label>
													<Input
														disabled={isView}
														invalid={
															formik.touched
																.businessState &&
															!!formik.errors
																.businessState
														}
														value={
															formik.values
																.businessState
														}
														type='text'
														name='businessState'
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
																.businessState
														}
													</FormFeedback>
												</FormGroup>
											</Col>
											<Col
												xs={12}
												sm={6}
												md={12}
												lg={4}
												xl={3}
											>
												<FormGroup>
													<Label>
														Business Zip Code
													</Label>
													<Input
														disabled={isView}
														invalid={
															formik.touched
																.businessZipCode &&
															!!formik.errors
																.businessZipCode
														}
														value={
															formik.values
																.businessZipCode
														}
														type='text'
														name='businessZipCode'
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
																.businessZipCode
														}
													</FormFeedback>
												</FormGroup>
											</Col>
										</Row>
										{!isView && (
											<Button
												color='primary'
												style={{ width: 200 }}
												type='submit'
											>
												{loading ? (
													<Spinner size='sm' />
												) : (
													'Save'
												)}
											</Button>
										)}
									</form>
								)}
							</CardBody>
						</Card>
					</div>
				</Row>
			</Container>
		</>
	);
};

export default WriteDriver;
