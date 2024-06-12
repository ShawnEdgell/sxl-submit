import { initializeApp } from 'firebase/app';
import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	setPersistence,
	browserLocalPersistence,
	type User
} from 'firebase/auth';
import {
	getFirestore,
	collection,
	addDoc,
	query,
	onSnapshot,
	getDocs,
	orderBy,
	where,
	deleteDoc
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

// Set session persistence
setPersistence(auth, browserLocalPersistence)
	.then(() => {
		console.log('Persistence set to local');
	})
	.catch((error) => {
		console.error('Error setting persistence:', error);
	});

export type VideoEntry = {
	id?: string;
	url: string;
	title: string;
	author: string;
	date: string;
	likes?: number;
	hasLiked?: boolean;
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
	return querySnapshot.docs.map((doc) => {
		const data = doc.data() as VideoEntry;
		data.id = doc.id;
		return data;
	});
};

const subscribeToVideoEntries = (callback: (entries: VideoEntry[]) => void) => {
	const q = query(collection(db, 'videoEntries'), orderBy('date', 'desc')); // Sorting by date in descending order
	return onSnapshot(q, async (querySnapshot) => {
		const entries = await Promise.all(
			querySnapshot.docs.map(async (doc) => {
				const data = doc.data() as VideoEntry;
				data.id = doc.id;
				data.likes = await getPostLikes(data.id);
				return data;
			})
		);
		callback(entries);
	});
};

const likePost = async (postId: string, userId: string) => {
	try {
		await addDoc(collection(db, 'likes'), { postId, userId });
	} catch (error) {
		console.error('Error liking post: ', error);
	}
};

const unlikePost = async (postId: string, userId: string) => {
	try {
		const q = query(
			collection(db, 'likes'),
			where('postId', '==', postId),
			where('userId', '==', userId)
		);
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach(async (doc) => {
			await deleteDoc(doc.ref);
		});
	} catch (error) {
		console.error('Error unliking post: ', error);
	}
};

const getPostLikes = async (postId: string): Promise<number> => {
	const q = query(collection(db, 'likes'), where('postId', '==', postId));
	const querySnapshot = await getDocs(q);
	return querySnapshot.size;
};

const hasUserLikedPost = async (postId: string, userId: string): Promise<boolean> => {
	const q = query(
		collection(db, 'likes'),
		where('postId', '==', postId),
		where('userId', '==', userId)
	);
	const querySnapshot = await getDocs(q);
	return !querySnapshot.empty;
};

export {
	auth,
	provider,
	signInWithPopup,
	signOut,
	addVideoEntry,
	getVideoEntries,
	subscribeToVideoEntries,
	onAuthStateChanged,
	likePost,
	unlikePost,
	getPostLikes,
	hasUserLikedPost
};
