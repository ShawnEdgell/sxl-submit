<script lang="ts">
	import { getDrawerStore, LightSwitch } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	function closeDrawer() {
		drawerStore.close();
	}
</script>

<div class="flex flex-col items-center mt-4 p-4 space-y-8">
	<div class="flex items-center gap-4">
		<p class="text-xl font-bold">LightSwitch:</p>
		<LightSwitch />
	</div>
	<nav class="w-full max-w-xs flex flex-col gap-2">
		<a
			on:click={closeDrawer}
			class="btn variant-filled"
			href="/"
			data-sveltekit-preload-data="hover">Home</a
		>
		<a
			on:click={closeDrawer}
			class="btn variant-filled"
			href="/archive"
			data-sveltekit-preload-data="hover">Archive</a
		>
	</nav>
</div>
