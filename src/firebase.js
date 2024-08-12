import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyBSCcVTSJcXAjHglCf5xMXFk-EII1CaWMk',
	authDomain: 'pedicabs-platform.firebaseapp.com',
	projectId: 'pedicabs-platform',
	storageBucket: 'pedicabs-platform.appspot.com',
	messagingSenderId: '664185084673',
	appId: '1:664185084673:web:ee12dae0079516200bd900',
	measurementId: 'G-TL4C1VYKLW',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
