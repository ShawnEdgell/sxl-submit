<script lang="ts">
	import { onMount } from 'svelte';
	import Countdown from '../components/Countdown.svelte';
	import Submit from '../components/Submit.svelte';
	import type { SvelteComponentTyped } from 'svelte';

	// Define a type for the Entries component
	type EntriesComponentType = typeof SvelteComponentTyped;

	// Declare the Entries variable with the correct type
	let Entries: EntriesComponentType | null = null;

	// Dynamically import Entries component
	onMount(async () => {
		const module = await import('../components/Entries.svelte');
		Entries = module.default as unknown as EntriesComponentType;
	});
</script>

<div class="text-center">
	<p>This week's contest ends in:</p>
	<Countdown />
	<hr class="!border-t-2" />
	<Submit />
	{#if Entries}
		<svelte:component this={Entries} />
	{:else}
		<p>Loading entries...</p>
	{/if}
</div>
