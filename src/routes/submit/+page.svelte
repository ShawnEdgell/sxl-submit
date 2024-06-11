<script lang="ts">
	import Countdown from '../../components/Countdown.svelte';
</script>

<main class="h-full w-full max-w-xl flex flex-col items-center justify-center p-6">
	<p class="text-lg mb-4">This week's contest ends in:</p>
	<Countdown />

	<section class="w-full mx-auto mb-6 md:mb-12 text-center">
		<h3 class="h3 mb-4">Submit Your Video</h3>
		<form class="form-control">
			<input
				type="text"
				name="video-url"
				class="input input-bordered"
				placeholder="Enter your video URL"
				required
			/>
			<button type="submit" class="btn variant-filled-primary mt-4">Submit</button>
		</form>
		<hr class="!border-t-2 mt-6 md:mt-12" />
	</section>

	<section class="w-full mx-auto">
		<h3 class="h3 font-bold mb-6 text-center">This Week's Entries</h3>
		<div class="space-y-4">
			<div class="card mb-6">
				<header class="card-header">
					<div class="relative overflow-hidden rounded-xl" style="padding-top: 56.25%;">
						<iframe
							class="absolute top-0 left-0 w-full h-full"
							src="https://www.youtube.com/embed/dQw4w9WgXcQ"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						></iframe>
					</div>
				</header>
				<div class="p-6 flex justify-between items-end">
					<div>
						<h3 class="h3 font-bold card-title mb-2">Sample Video Title</h3>
						<p>Author, date posted</p>
					</div>
					<div>
						<button class="btn variant-ghost-surface">🔥</button>
					</div>
				</div>
			</div>
			<div class="card mb-6">
				<header class="card-header">
					<div class="relative overflow-hidden rounded-xl" style="padding-top: 56.25%;">
						<iframe
							class="absolute top-0 left-0 w-full h-full"
							src="https://www.youtube.com/embed/dQw4w9WgXcQ"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
						></iframe>
					</div>
				</header>
				<div class="p-6 flex justify-between items-end">
					<div>
						<h3 class="h3 font-bold card-title mb-2">Sample Video Title</h3>
						<p>Author, date posted</p>
					</div>
					<div>
						<button class="btn variant-ghost-surface">🔥</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</main>
