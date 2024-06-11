<script lang="ts">
	import { onMount } from 'svelte';
	import { readable } from 'svelte/store';

	interface TimeLeft {
		days: number;
		hours: number;
		minutes: number;
		seconds: number;
	}

	function getNextSundayMidnight(): Date {
		const now = new Date();
		const nextSunday = new Date(now);
		nextSunday.setDate(now.getDate() + (7 - now.getDay()));
		nextSunday.setHours(0, 0, 0, 0);
		return nextSunday;
	}

	function calculateTimeLeft(): TimeLeft {
		const targetDate = getNextSundayMidnight();
		const difference = +targetDate - +new Date();
		let timeLeft: TimeLeft;

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60)
			};
		} else {
			timeLeft = {
				days: 0,
				hours: 0,
				minutes: 0,
				seconds: 0
			};
		}

		return timeLeft;
	}

	const timeLeft = readable(calculateTimeLeft(), (set) => {
		const interval = setInterval(() => {
			set(calculateTimeLeft());
		}, 1000);

		return () => clearInterval(interval);
	});
</script>

<div class="font-bold text-3xl md:text-6xl">
	{#if $timeLeft}
		{$timeLeft.days}d {$timeLeft.hours}h {$timeLeft.minutes}m {$timeLeft.seconds}s
	{/if}
</div>
