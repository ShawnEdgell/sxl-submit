<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import Footer from '$lib/components/Footer.svelte';
</script>

<AppShell>
	<div class="flex justify-center">
		<slot />
	</div>
	<svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment>
	<!-- (footer) -->
</AppShell>
