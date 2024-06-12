<script lang="ts">
	import Login from './Login.svelte';
	import Avatar from './Avatar.svelte';
	import { getDrawerStore, popup } from '@skeletonlabs/skeleton';
	import type { DrawerSettings, PopupSettings } from '@skeletonlabs/skeleton';

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'bottom-end'
	};

	const drawerSettings: DrawerSettings = {
		width: 'w-[280px] md:w-[480px]',
		rounded: 'none'
	};

	const drawerStore = getDrawerStore();

	function openDrawer() {
		drawerStore.open(drawerSettings);
	}
</script>

<div class="flex justify-center bg-surface-100-800-token w-full">
	<div class="max-w-2xl w-full flex items-center justify-between p-4">
		<div class="flex items-center">
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
		</div>

		<div class="flex">
			<button class="btn p-0 m-0" use:popup={popupClick}>
				<Avatar width="w-10" />
			</button>
			<div class="card p-4 absolute hidden" data-popup="popupClick">
				<Login />
			</div>
		</div>
	</div>
</div>
