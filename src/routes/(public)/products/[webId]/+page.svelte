<script lang="ts">
	import SingleProductCard from '$lib/components/SingleProductCard.svelte';
	import { page } from '$app/stores';

	export let data: any;
	$: ({ ProductDetail } = data);

	$: sku = $page.url.searchParams.get('sku') || null;
</script>

<SingleProductCard product={ProductDetail} {sku} />
