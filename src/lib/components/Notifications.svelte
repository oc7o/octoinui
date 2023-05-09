<script lang="ts">
	import Toast from './Toast.svelte';

	import { dismissToast, toasts } from '$lib/notifications';
</script>

{#if $toasts.length > 0}
	<div class="toast toast-top toast-end">
		{#each $toasts as toast (toast.id)}
			<Toast
				type={toast.type}
				dismissible={toast.dismissible}
				on:dismiss={() => dismissToast(toast.id)}>{toast.message}</Toast
			>
		{/each}
	</div>
{/if}
