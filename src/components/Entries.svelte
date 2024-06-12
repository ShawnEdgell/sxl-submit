<script lang="ts">
	import {
		subscribeToVideoEntries,
		likePost,
		unlikePost,
		hasUserLikedPost,
		getLikesCount
	} from '../firebase';
	import type { VideoEntry } from '../firebase';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { format } from 'date-fns';
	import { get } from 'svelte/store';
	import { user } from '../firebase';

	const entries = writable<VideoEntry[]>([]);
	let currentUser = get(user);

	onMount(() => {
		const unsubscribe = subscribeToVideoEntries(async (videoEntries: VideoEntry[]) => {
			entries.set(videoEntries);
		});
		user.subscribe((value) => {
			currentUser = value;
		});
		return () => unsubscribe();
	});

	function getYouTubeEmbedUrl(url: string): string | null {
		const regex =
			/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.+\?.*v=)|youtu\.be\/)([^"&?/\s]{11})/i;
		const match = url.match(regex);
		return match ? `https://www.youtube.com/embed/${match[1]}` : null;
	}

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return format(date, 'EEEE, MMMM d, yyyy');
	}

	async function toggleLike(entry: VideoEntry) {
		if (!currentUser) return;
		if (entry.hasLiked) {
			await unlikePost(entry.id, currentUser.uid);
		} else {
			await likePost(entry.id, currentUser.uid);
		}
		// Update the entry's like status and count
		entry.hasLiked = !entry.hasLiked;
		entry.likes = (await getLikesCount(entry.id)) || 0;
	}
</script>

<h2>This Week's Entries</h2>

{#each $entries as entry}
	<div class="card mb-8 shadow-xl">
		<div class="relative overflow-hidden rounded-2xl" style="padding-top: 56.25%;">
			<iframe
				title="video submission"
				class="absolute top-0 left-0 w-full h-full"
				src={getYouTubeEmbedUrl(entry.url)}
				loading="lazy"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</div>

		<div class="p-6 flex flex-col sm:flex-row sm:justify-between sm:items-end">
			<div>
				<div class="text-left m-0 p-0">
					<span class="h3 font-bold m-0 p-0">{entry.title}</span>
				</div>
				<div class="text-left p-0 m-0">
					{formatDate(entry.date)}
				</div>
			</div>
			<div class="self-end sm:self-auto mt-4 sm:mt-0">
				<button
					class="btn sm:btn-lg variant-ghost-surface"
					on:click={() => toggleLike(entry)}
					disabled={!currentUser}
				>
					🔥 {entry.likes || 0}
				</button>
			</div>
		</div>
	</div>
{/each}
