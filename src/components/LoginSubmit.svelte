<script lang="ts">
	import { auth, provider, signInWithPopup, signOut, addVideoEntry } from '../firebase';
	import type { User } from 'firebase/auth';
	import type { VideoEntry } from '../firebase';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	// Store to manage the authentication state
	const user = writable<User | null>(null);

	// Check the authentication state on component mount
	onMount(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				user.set(authUser);
			} else {
				user.set(null);
			}
		});
		return () => unsubscribe();
	});

	async function handleGoogleLogin() {
		try {
			const result = await signInWithPopup(auth, provider);
			user.set(result.user);
			console.log('User info:', result.user);
		} catch (error) {
			console.error('Error during sign in:', error);
		}
	}

	async function handleLogout() {
		try {
			await signOut(auth);
			user.set(null);
			console.log('User logged out');
		} catch (error) {
			console.error('Error during sign out:', error);
		}
	}

	function getYouTubeEmbedUrl(url: string): string | null {
		const regex =
			/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.+\?.*v=)|youtu\.be\/)([^"&?/\s]{11})/i;
		const match = url.match(regex);
		return match ? `https://www.youtube.com/embed/${match[1]}` : null;
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const input = form.querySelector('input[name="video-url"]') as HTMLInputElement;
		const videoUrl = getYouTubeEmbedUrl(input.value);

		if (!videoUrl) {
			console.error('Invalid YouTube URL');
			return;
		}

		const currentUser = $user;
		if (currentUser) {
			const entry: VideoEntry = {
				url: videoUrl,
				title: `Video by ${currentUser.displayName || 'Anonymous'}`,
				author: currentUser.displayName || 'Anonymous',
				date: new Date().toISOString()
			};

			try {
				await addVideoEntry(entry);
				console.log('Video submitted:', entry);
			} catch (error) {
				console.error('Error submitting video:', error);
			}
		}

		input.value = '';
	}
</script>

<section class="w-full mx-auto text-center">
	<form class="form-control" on:submit={handleSubmit}>
		{#if $user}
			<div class="flex flex-col items-center">
				<p>Welcome, {$user.displayName}!</p>
				<img
					src={$user.photoURL}
					alt="{$user.displayName}'s profile picture"
					class="rounded-full w-16 h-16 mt-4 mb-4"
				/>
				<button type="button" class="btn variant-filled-primary" on:click={handleLogout}>
					Logout
				</button>
				<h2>Submit Your Video</h2>
				<input
					type="text"
					name="video-url"
					class="input input-bordered mt-4"
					placeholder="Enter your video URL"
					required
				/>
				<button type="submit" class="btn variant-filled-primary mt-4">Submit</button>
			</div>
		{:else}
			<p>You need to be logged in to post and react to posts.</p>
			<button type="button" class="btn sm:btn-lg variant-ghost mt-4" on:click={handleGoogleLogin}>
				<span>
					<svg
						class="w-6 h-6 mr-2"
						viewBox="-0.5 0 48 48"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						fill="#000000"
					>
						<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
						<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
						<g id="SVGRepo_iconCarrier">
							<title>Google-color</title>
							<desc>Created with Sketch.</desc>
							<defs></defs>
							<g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
								<g id="Color-" transform="translate(-401.000000, -860.000000)">
									<g id="Google" transform="translate(401.000000, 860.000000)">
										<path
											d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
											id="Fill-1"
											fill="#FBBC05"
										></path>
										<path
											d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
											id="Fill-2"
											fill="#EB4335"
										></path>
										<path
											d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
											id="Fill-3"
											fill="#34A853"
										></path>
										<path
											d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
											id="Fill-4"
											fill="#4285F4"
										></path>
									</g>
								</g>
							</g>
						</g>
					</svg>
				</span>
				<span>Sign in with Google</span>
			</button>
		{/if}
	</form>
</section>
