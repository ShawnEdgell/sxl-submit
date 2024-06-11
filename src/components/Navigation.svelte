<script lang="ts">
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();

	function closeDrawer() {
		drawerStore.close();
	}
</script>

<nav class="flex flex-col text-center gap-2 p-4 my-4 justify-center">
	<a
		on:click={closeDrawer}
		class="btn btn-lg variant-soft"
		href="/"
		data-sveltekit-preload-data="hover">Home</a
	>
	<a
		on:click={closeDrawer}
		class="btn btn-lg variant-soft"
		href="/submit"
		data-sveltekit-preload-data="hover">Submit</a
	>
	<a
		on:click={closeDrawer}
		class="btn btn-lg variant-soft"
		href="/archive"
		data-sveltekit-preload-data="hover">Archive</a
	>
	<a
		on:click={closeDrawer}
		class="btn btn-lg variant-soft"
		href="/login"
		data-sveltekit-preload-data="hover">Login</a
	>
</nav>
