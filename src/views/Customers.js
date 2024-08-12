import CustomTable from 'components/CustomTable';
import HeaderWithoutCards from 'components/Headers/HeaderWithoutCards';
import { collection, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	Card,
	CardHeader,
	CardBody,
	Nav,
	NavItem,
	NavLink,
	Row,
	Container,
	Button,
	ButtonGroup,
	Modal,
	ModalHeader,
	Label,
	Input,
	ModalBody,
	FormGroup,
} from 'reactstrap';
import { db } from '../firebase';
import { doc } from 'firebase/firestore';
import moment from 'moment';

const Customers = () => {
	let [loading, setLoading] = useState(false);
	let [customers, setCustomers] = useState([]);
	let [customerDetails, setCustomerDetails] = useState(null);

	useEffect(() => {
		const fetchCustomers = async () => {
			try {
				setLoading(true);
				let collectionRef = collection(db, 'customers');
				onSnapshot(collectionRef, snapshot => {
					let customers = [];
					snapshot.docs.forEach(doc => {
						customers.push({ id: doc.id, ...doc.data() });
					});
					setCustomers(customers);
					setLoading(false);
				});
			} catch (err) {
				toast.error(err.message);
			}
		};
		fetchCustomers();
	}, []);

	const toggleCustomerDetailsModal = (e, details = null) => {
		setCustomerDetails(details);
	};

	return (
		<>
			<HeaderWithoutCards />
			<Container className='mt--7 pb-4' fluid>
				<Row>
					<div className='col'>
						<Card className='shadow'>
							<CardHeader className='bg-transparent d-flex align-items-center'>
								<h3 className='mb-0'>Customers</h3>
							</CardHeader>
							<CustomTable
								loading={loading}
								cols={[
									{
										header: 'Serial Number',
										key: 'serialNumber',
									},
									{ header: 'First Name', key: 'firstName' },
									{ header: 'Last Name', key: 'lastName' },
									{ header: 'Actions', key: 'actions' },
								]}
								allowSearch={true}
								rows={customers.map((item, itemIdx) => ({
									...item,
									serialNumber: itemIdx + 1,
									actions: (
										<>
											<ButtonGroup>
												<Button
													onClick={e =>
														toggleCustomerDetailsModal(
															e,
															item
														)
													}
													size='sm'
													color='dark'
												>
													View
												</Button>
												<Button
													size='sm'
													color='warning'
													tag={Link}
													to={`/admin/customers/${item.id}/history`}
												>
													History
												</Button>
											</ButtonGroup>
										</>
									),
								}))}
								searchKeys={['firstName', 'lastName']}
							/>
						</Card>
					</div>
				</Row>
			</Container>
			<Modal
				isOpen={customerDetails !== null}
				toggle={toggleCustomerDetailsModal}
				centered
			>
				<ModalHeader
					className='border-bottom d-flex align-items-center'
					toggle={toggleCustomerDetailsModal}
				>
					Customer Details
				</ModalHeader>
				<ModalBody>
					<FormGroup>
						<Label>First Name</Label>
						<Input
							readOnly={true}
							value={customerDetails?.firstName}
						></Input>
					</FormGroup>
					<FormGroup>
						<Label>Last Name</Label>
						<Input
							readOnly={true}
							value={customerDetails?.lastName}
						></Input>
					</FormGroup>
					<FormGroup>
						<Label>Email</Label>
						<Input
							readOnly={true}
							value={customerDetails?.email}
						></Input>
					</FormGroup>
					<FormGroup>
						<Label>Phone</Label>
						<Input
							readOnly={true}
							value={customerDetails?.phone}
						></Input>
					</FormGroup>
					<FormGroup>
						<Label>Created At</Label>
						<Input
							readOnly={true}
							value={moment(
								customerDetails?.createdAt.toDate()
							).format('DD/MM/YYYY HH:mm')}
						></Input>
					</FormGroup>
					<FormGroup>
						<Label>Created At</Label>
						<Input
							readOnly={true}
							value={moment(
								customerDetails?.modifiedAt.toDate()
							).format('DD/MM/YYYY HH:mm')}
						></Input>
					</FormGroup>
				</ModalBody>
			</Modal>
		</>
	);
};

export default Customers;
