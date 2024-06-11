<script lang="ts">
	import Countdown from '../components/Countdown.svelte';
	import LoginSubmit from '../components/LoginSubmit.svelte';
	import Entries from '../components/Entries.svelte';
</script>

<main class="h-full w-full max-w-xl flex flex-col items-center justify-center">
	<section class="w-full mx-auto text-center">
		<p>This week's contest ends in:</p>
		<Countdown />
	</section>

	<section class="w-full mx-auto text-center">
		<hr class="!border-t-2" />
		<LoginSubmit />
	</section>

	<section class="w-full mx-auto">
		<hr class="!border-t-2" />
		<Entries />
	</section>
</main>
