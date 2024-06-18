<script lang="ts">
	import '../app.postcss';
	import { initializeStores, autoModeWatcher, setInitialClassState } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	initializeStores();

	// Initialize theme state on page load
	onMount(() => {
		setInitialClassState();
	});

	// Components
	import AppBar from '../components/AppBar.svelte';
	import Footer from '../components/Footer.svelte';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<svelte:head>
	{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}
	{@html '<script>(' + setInitialClassState.toString() + ')();</script>'}
</svelte:head>

<div class="flex flex-col min-h-screen items-center">
	<div class="w-full sticky top-0 z-10 shadow-lg">
		<AppBar />
	</div>
	<!-- Add LightSwitch component here -->
	<div class="flex-1 w-full max-w-2xl prose dark:prose-dark lg:prose-xl my-4 p-4">
		<slot />
	</div>
</div>
<Footer />
