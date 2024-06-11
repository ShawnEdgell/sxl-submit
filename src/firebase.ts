import { initializeApp } from 'firebase/app';
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	type User
} from 'firebase/auth';
import {
	getFirestore,
	collection,
	addDoc,
	query,
	onSnapshot,
	getDocs,
	orderBy
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export type VideoEntry = {
	url: string;
	title: string;
	author: string;
	date: string;
};

const addVideoEntry = async (entry: VideoEntry) => {
	try {
		await addDoc(collection(db, 'videoEntries'), entry);
	} catch (error) {
		console.error('Error adding document: ', error);
	}
};

const getVideoEntries = async (): Promise<VideoEntry[]> => {
	const q = query(collection(db, 'videoEntries'), orderBy('date', 'desc')); // Sorting by date in descending order
	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((doc) => doc.data() as VideoEntry);
};

const subscribeToVideoEntries = (callback: (entries: VideoEntry[]) => void) => {
	const q = query(collection(db, 'videoEntries'), orderBy('date', 'desc')); // Sorting by date in descending order
	return onSnapshot(q, (querySnapshot) => {
		const entries = querySnapshot.docs.map((doc) => doc.data() as VideoEntry);
		callback(entries);
	});
};

export {
	auth,
	provider,
	signInWithPopup,
	signOut,
	addVideoEntry,
	getVideoEntries,
	subscribeToVideoEntries,
	onAuthStateChanged
};
