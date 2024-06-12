import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';

// Store to manage the authentication state
export const user = writable<User | null>(null);
