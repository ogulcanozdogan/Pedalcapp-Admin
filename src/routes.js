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
import Login from 'views/auth/Login.js';
import Earnings from 'views/Earnings';
import Drivers from 'views/Drivers';
import WriteDriver from 'views/WriteDriver';
import Reviews from 'views/Reviews';
import Customers from 'views/Customers';
import CustomerHistory from 'views/CustomerHistory';
import Bookings from 'views/Bookings';
import Rates from 'views/Rates';

var routes = [
	{
		path: '/earnings',
		name: 'Earnings',
		icon: 'fas fa-money-bill-wave text-primary',
		component: <Earnings />,
		layout: '/admin',
	},
	// Driver Routes
	{
		path: '/drivers',
		name: 'Drivers',
		icon: 'fas fa-biking text-primary',
		component: <Drivers />,
		layout: '/admin',
	},
	{
		path: '/drivers/add',
		component: <WriteDriver />,
		layout: '/admin',
		isMenu: false,
	},
	{
		path: '/drivers/edit/:id',
		component: <WriteDriver />,
		layout: '/admin',
		isMenu: false,
	},
	{
		path: '/drivers/view/:id',
		component: <WriteDriver />,
		layout: '/admin',
		isMenu: false,
	},
	{
		path: '/drivers/:id/reviews',
		component: <Reviews />,
		layout: '/admin',
		isMenu: false,
	},
	// Customer Routes
	{
		path: '/customers',
		name: 'Customers',
		icon: 'fas fa-person text-primary',
		component: <Customers />,
		layout: '/admin',
	},
	{
		path: '/customers/:id/history',
		component: <CustomerHistory />,
		layout: '/admin',
		isMenu: false,
	},
	// Bookings
	{
		path: '/bookings',
		name: 'Bookings',
		icon: 'fas fa-ticket-alt text-primary',
		component: <Bookings />,
		layout: '/admin',
	},
	// Fares
	{
		path: '/rates',
		name: 'Rates',
		icon: 'fas fa-money-bill-alt text-primary',
		component: <Rates />,
		layout: '/admin',
	},
	{
		path: '/login',
		component: <Login />,
		layout: '/auth',
		isMenu: false,
	},
];
export default routes;
