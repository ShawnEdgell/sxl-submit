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
	orderBy,
	where,
	doc,
	deleteDoc,
	setDoc,
	getDoc,
	increment,
	updateDoc
} from 'firebase/firestore';
import { writable } from 'svelte/store';

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

// Store to manage the authentication state
export const user = writable<User | null>(null);

// Listen to authentication state changes and update the user store
onAuthStateChanged(auth, (authUser) => {
	if (authUser) {
		user.set(authUser);
	} else {
		user.set(null);
	}
});

export type VideoEntry = {
	id: string;
	url: string;
	title: string;
	author: string;
	date: string;
	likes?: number;
	hasLiked?: boolean;
};

const addVideoEntry = async (entry: Omit<VideoEntry, 'id'>) => {
	try {
		const docRef = await addDoc(collection(db, 'videoEntries'), { ...entry, likes: 0 });
		console.log('Document written with ID: ', docRef.id);
	} catch (error) {
		console.error('Error adding document: ', error);
	}
};

const getVideoEntries = async (): Promise<VideoEntry[]> => {
	const q = query(collection(db, 'videoEntries'), orderBy('date', 'desc')); // Sorting by date in descending order
	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as VideoEntry[];
};

const subscribeToVideoEntries = (callback: (entries: VideoEntry[]) => void) => {
	const q = query(collection(db, 'videoEntries'), orderBy('date', 'desc')); // Sorting by date in descending order
	return onSnapshot(q, async (querySnapshot) => {
		const entries = await Promise.all(
			querySnapshot.docs.map(async (doc) => {
				const data = doc.data() as VideoEntry;
				data.id = doc.id;
				data.likes = (await getLikesCount(doc.id)) || 0;
				data.hasLiked = await hasUserLikedPost(doc.id, auth.currentUser?.uid);
				return data;
			})
		);
		callback(entries);
	});
};

const getLikesCount = async (postId: string) => {
	const q = query(collection(db, 'likes'), where('postId', '==', postId));
	const querySnapshot = await getDocs(q);
	return querySnapshot.size;
};

const hasUserLikedPost = async (postId: string, userId: string | undefined) => {
	if (!userId) return false;
	const q = query(
		collection(db, 'likes'),
		where('postId', '==', postId),
		where('userId', '==', userId)
	);
	const querySnapshot = await getDocs(q);
	return !querySnapshot.empty;
};

const likePost = async (postId: string, userId: string) => {
	const likeDoc = doc(collection(db, 'likes'));
	await setDoc(likeDoc, { postId, userId });

	// Increment likes count in the video entry
	const postRef = doc(db, 'videoEntries', postId);
	await updateDoc(postRef, { likes: increment(1) });
};

const unlikePost = async (postId: string, userId: string) => {
	const q = query(
		collection(db, 'likes'),
		where('postId', '==', postId),
		where('userId', '==', userId)
	);
	const querySnapshot = await getDocs(q);
	if (!querySnapshot.empty) {
		await deleteDoc(querySnapshot.docs[0].ref);

		// Decrement likes count in the video entry
		const postRef = doc(db, 'videoEntries', postId);
		await updateDoc(postRef, { likes: increment(-1) });
	}
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
	hasUserLikedPost,
	getLikesCount
};
