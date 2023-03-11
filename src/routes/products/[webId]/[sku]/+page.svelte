<script lang="ts">
	import SingleProductCard from '$lib/components/SingleProductCard.svelte';
	import { page } from '$app/stores';
</script>

<SingleProductCard webId={$page.params.webId} sku={$page.params.sku} />
