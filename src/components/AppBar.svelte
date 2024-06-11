<script lang="ts">
	import { AppBar, LightSwitch, getDrawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';

	const drawerSettings: DrawerSettings = {
		width: 'w-[280px] md:w-[480px]',
		rounded: 'none'
	};

	const drawerStore = getDrawerStore();

	function openDrawer() {
		drawerStore.open(drawerSettings);
	}
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead">
		<button on:click={openDrawer} class="h-10 w-10 cursor-pointer" aria-label="Open drawer">
			<svg
				class="h-full w-full"
				fill="currentColor"
				viewBox="0 0 32 32"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
				<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
				<g id="SVGRepo_iconCarrier">
					<path
						d="M6.001 7.128L6 10.438l19.998-.005L26 7.124zM6.001 21.566L6 24.876l19.998-.006.002-3.308zM6.001 14.341L6 17.65l19.998-.004.002-3.309z"
					></path>
				</g>
			</svg>
		</button>
	</svelte:fragment>
	<a href="/" class="text-2xl btn-lg italic font-bold">XLSubmit.</a>
	<svelte:fragment slot="trail">
		<LightSwitch />
	</svelte:fragment>
</AppBar>
