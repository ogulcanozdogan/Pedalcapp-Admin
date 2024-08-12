import CustomTable from 'components/CustomTable';
import HeaderWithoutCards from 'components/Headers/HeaderWithoutCards';
import { collection, getDocs, onSnapshot, updateDoc } from 'firebase/firestore';
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
} from 'reactstrap';
import { db } from '../firebase';
import { doc } from 'firebase/firestore';

const Drivers = () => {
	let [activeTab, setActiveTab] = useState('active');
	let [loading, setLoading] = useState(false);
	let [drivers, setDrivers] = useState([]);

	const updateStatus = async (id, status) => {
		let docRef = doc(db, 'drivers', id);
		await updateDoc(docRef, { status });
		toast.success('Status updated successfully for the driver.');
	};

	useEffect(() => {
		const fetchDrivers = async () => {
			try {
				setLoading(true);
				let collectionRef = collection(db, 'drivers');
				onSnapshot(collectionRef, snapshot => {
					let drivers = [];
					snapshot.docs.forEach(doc => {
						drivers.push({ id: doc.id, ...doc.data() });
					});
					setDrivers(drivers);
					setLoading(false);
				});
			} catch (err) {
				toast.error(err.message);
			}
		};
		fetchDrivers();
	}, []);
	return (
		<>
			<HeaderWithoutCards />
			<Container className='mt--7 pb-4' fluid>
				<Row>
					<div className='col'>
						<Card className='shadow'>
							<CardHeader className='bg-transparent d-flex align-items-center'>
								<h3 className='mb-0'>Drivers</h3>
								<Button
									tag={Link}
									to='/admin/drivers/add'
									color='primary'
									className='ml-auto'
								>
									<i className='fa fa-plus mr-2'></i>
									Add Driver
								</Button>
							</CardHeader>
							<CardBody className='px-0 pb-0'>
								<Nav tabs>
									<NavItem className='ml-4'>
										<NavLink
											style={{ cursor: 'pointer' }}
											onClick={() => {
												setActiveTab('active');
											}}
											active={activeTab === 'active'}
										>
											Active
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink
											style={{ cursor: 'pointer' }}
											onClick={() =>
												setActiveTab('inactive')
											}
											active={activeTab === 'inactive'}
										>
											Inactive
										</NavLink>
									</NavItem>
									<NavItem>
										<NavLink
											style={{ cursor: 'pointer' }}
											onClick={() =>
												setActiveTab('pending')
											}
											active={activeTab === 'pending'}
										>
											Pending
										</NavLink>
									</NavItem>
								</Nav>
							</CardBody>
							<CustomTable
								loading={loading}
								cols={[
									{
										header: 'Serial Number',
										key: 'serialNumber',
									},
									{ header: 'First Name', key: 'firstName' },
									{ header: 'Last Name', key: 'lastName' },
									{ header: 'Status', key: 'status' },
									{ header: 'Actions', key: 'actions' },
								]}
								allowSearch={true}
								rows={drivers
									.filter(
										item =>
											(
												item?.status || 'Active'
											).toLowerCase() === activeTab
									)
									.map((item, itemIdx) => ({
										...item,
										serialNumber: itemIdx + 1,
										actions: (
											<>
												<ButtonGroup>
													{item.status ===
													'Active' ? (
														<Button
															size='sm'
															color='danger'
															onClick={() => {
																updateStatus(
																	item.id,
																	'Inactive'
																);
															}}
														>
															Deactivate
														</Button>
													) : item.status ===
													  'Inactive' ? (
														<Button
															size='sm'
															color='success'
															onClick={() => {
																updateStatus(
																	item.id,
																	'Active'
																);
															}}
														>
															Activate
														</Button>
													) : item.status ===
													  'Pending' ? (
														<>
															<Button
																size='sm'
																color='success'
																onClick={() => {
																	updateStatus(
																		item.id,
																		'Active'
																	);
																}}
															>
																Accept
															</Button>
															<Button
																size='sm'
																color='danger'
																onClick={() => {
																	updateStatus(
																		item.id,
																		'Inactive'
																	);
																}}
															>
																Reject
															</Button>
														</>
													) : (
														''
													)}
													<Button
														size='sm'
														color='info'
														tag={Link}
														to={`/admin/drivers/edit/${item.id}`}
													>
														Edit
													</Button>
													<Button
														size='sm'
														color='dark'
														tag={Link}
														to={`/admin/drivers/view/${item.id}`}
													>
														View
													</Button>
													<Button
														size='sm'
														color='warning'
														tag={Link}
														to={`/admin/drivers/${item.id}/reviews`}
													>
														Reviews
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
		</>
	);
};

export default Drivers;
