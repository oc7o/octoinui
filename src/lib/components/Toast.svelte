<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import Close from '$lib/components/icons/Close.svelte';

	const dispatch = createEventDispatcher();

	export let type = 'error';
	export let dismissible = true;
</script>

<div class="alert alert-{type}" transition:fade>
	{#if type === 'success'}{:else if type === 'error'}{:else}{/if}

	<slot />

	{#if dismissible}
		<button class="close" on:click={() => dispatch('dismiss')}><Close /></button>
	{/if}
</div>
