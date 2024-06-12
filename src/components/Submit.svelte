<script lang="ts">
	import { auth, addVideoEntry } from '../firebase';
	import type { User } from 'firebase/auth';
	import type { VideoEntry } from '../firebase';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	const user = writable<User | null>(null);
	const errorMessage = writable('');

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
			errorMessage.set('Invalid YouTube URL. Please enter a valid URL.');
			return;
		}

		const currentUser = $user;
		if (currentUser) {
			const entry: Omit<VideoEntry, 'id'> = {
				url: videoUrl,
				title: `Video by ${currentUser.displayName || 'Anonymous'}`,
				author: currentUser.displayName || 'Anonymous',
				date: new Date().toISOString()
			};

			try {
				await addVideoEntry(entry);
				console.log('Video submitted:', entry);
				input.value = '';
				errorMessage.set('');
			} catch (error) {
				console.error('Error submitting video:', error);
				errorMessage.set('Failed to submit video. Please try again.');
			}
		}
	}
</script>

<form class="form-control" on:submit={handleSubmit}>
	{#if $user}
		<h2>Submit Your Video</h2>
		<input
			type="text"
			name="video-url"
			class="input input-bordered"
			placeholder="Enter your video URL"
			required
		/>
		<button type="submit" class="btn variant-filled-primary mt-4"> Submit </button>
		{#if $errorMessage}
			<p class="text-error mt-2">{$errorMessage}</p>
		{/if}
	{:else}
		<p>You need to be logged in to submit and react to videos.</p>
	{/if}
</form>
