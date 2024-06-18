<script lang="ts">
	import Login from './Login.svelte';
	import Avatar from './Avatar.svelte';
	import { getDrawerStore, popup, LightSwitch } from '@skeletonlabs/skeleton';
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
			<LightSwitch />
		</div>
		<div>
			<a href="/" class="btn btn-sm variant-ghost" data-sveltekit-preload-data="hover">Home</a>
			<a href="/archive" class="btn btn-sm variant-ghost" data-sveltekit-preload-data="hover"
				>Archive</a
			>
		</div>
		<div class="relative flex">
			<button class="btn p-0 m-0" use:popup={popupClick}>
				<Avatar width="w-10" />
			</button>
			<div class="card p-4 absolute hidden" data-popup="popupClick">
				<Login />
			</div>
		</div>
	</div>
</div>
