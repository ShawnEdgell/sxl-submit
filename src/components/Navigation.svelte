<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	function closeDrawer() {
		drawerStore.close();
	}
</script>

<nav class="flex flex-col text-center gap-2 p-4 mt-4 justify-center">
	<a
		on:click={closeDrawer}
		class="btn btn-lg variant-soft"
		href="/"
		data-sveltekit-preload-data="hover">Home</a
	>
</nav>
