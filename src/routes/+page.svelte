<script lang="ts">
	import Countdown from '../components/Countdown.svelte';
	import Submit from '../components/Submit.svelte';
	import Entries from '../components/Entries.svelte';
</script>

<div class="text-center">
	<p>This week's contest ends in:</p>
	<Countdown />
	<hr class="!border-t-2" />
	<Submit />
	<Entries />
</div>
