/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from 'react';
import { useLocation, Route, Routes, Navigate } from 'react-router-dom';
import AdminNavbar from 'components/Navbars/AdminNavbar.js';
import Sidebar from 'components/Sidebar/Sidebar.js';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';

import routes from 'routes.js';
import { fetchBookings } from 'store/actions/bookingActions';

const Admin = props => {
	const mainContent = React.useRef(null);
	const location = useLocation();
	const dispatch = useDispatch();

	React.useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
		mainContent.current.scrollTop = 0;
	}, [location]);

	useEffect(() => {
		const getBookings = async () => {
			await dispatch(fetchBookings());
		};
		getBookings();
	}, []);

	const getRoutes = routes => {
		return routes.map((prop, key) => {
			if (prop.layout === '/admin') {
				return (
					<Route
						path={prop.path}
						element={prop.component}
						key={key}
						exact
					/>
				);
			} else {
				return null;
			}
		});
	};

	const getBrandText = path => {
		console.log(path);
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].layout + routes[i].path === path) {
				return routes[i].name;
			}
		}
		return 'Brand';
	};

	return (
		<>
			<ToastContainer />
			<Sidebar
				{...props}
				routes={routes}
				logo={{
					innerLink: '/admin/earnings',
					imgSrc: require('../assets/img/brand/argon-react.png'),
					imgAlt: '...',
				}}
			/>
			<div className='main-content' ref={mainContent}>
				<AdminNavbar
					{...props}
					brandText={getBrandText(location?.pathname)}
				/>
				<Routes>
					{getRoutes(routes)}
					<Route
						path='*'
						element={<Navigate to='/admin/earnings' replace />}
					/>
				</Routes>
			</div>
		</>
	);
};

export default Admin;
