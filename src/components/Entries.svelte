<script lang="ts">
	import { subscribeToVideoEntries } from '../firebase';
	import type { VideoEntry } from '../firebase';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { format } from 'date-fns';

	const entries = writable<VideoEntry[]>([]);

	onMount(() => {
		const unsubscribe = subscribeToVideoEntries((videoEntries: VideoEntry[]) => {
			entries.set(videoEntries);
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
</script>

<section class="w-full mx-auto">
	<h2 class="font-bold text-center">This Week's Entries</h2>
	<div class="space-y-4">
		{#each $entries as entry}
			<div class="card">
				<header class="card-header">
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
				</header>
				<div class="p-6 flex flex-col sm:flex-row sm:justify-between sm:items-end">
					<div>
						<div class="p-0 m-0">
							<span class="font-semibold">Author:</span>
							{entry.author}
						</div>
						<div class="p-0 m-0">
							<span class="font-semibold">Date:</span>
							{formatDate(entry.date)}
						</div>
					</div>
					<div class="self-end sm:self-auto mt-4 sm:mt-0">
						<button class="btn variant-ghost-surface">🔥</button>
					</div>
				</div>
			</div>
		{/each}
	</div>
</section>
