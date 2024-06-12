<script lang="ts">
	import {
		subscribeToVideoEntries,
		likePost,
		unlikePost,
		getPostLikes,
		hasUserLikedPost
	} from '../firebase';
	import type { VideoEntry } from '../firebase';
	import { onMount } from 'svelte';
	import { writable, get } from 'svelte/store';
	import { user } from '../stores';
	import { format } from 'date-fns';

	const entries = writable<VideoEntry[]>([]);

	onMount(() => {
		const unsubscribe = subscribeToVideoEntries(async (videoEntries: VideoEntry[]) => {
			const currentUser = get(user);
			const updatedEntries = await Promise.all(
				videoEntries.map(async (entry) => {
					entry.likes = await getPostLikes(entry.id!);
					entry.hasLiked = currentUser ? await hasUserLikedPost(entry.id!, currentUser.uid) : false;
					return entry;
				})
			);
			entries.set(updatedEntries);
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

	async function handleLike(entry: VideoEntry) {
		const currentUser = get(user);
		if (!currentUser) return;

		if (entry.hasLiked) {
			await unlikePost(entry.id!, currentUser.uid);
			entry.likes = (entry.likes ?? 0) - 1;
		} else {
			await likePost(entry.id!, currentUser.uid);
			entry.likes = (entry.likes ?? 0) + 1;
		}
		entry.hasLiked = !entry.hasLiked;
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
			<div class="self-end sm:self-auto mt-4 sm:mt-0 flex items-center space-x-2">
				<button
					class="btn sm:btn-lg variant-ghost-surface"
					on:click={() => handleLike(entry)}
					disabled={!$user}
				>
					🔥 {entry.likes ?? 0}
				</button>
			</div>
		</div>
	</div>
{/each}
