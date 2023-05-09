<script lang="ts">
	import SingleProductCard from '$lib/components/SingleProductCard.svelte';
	import { page } from '$app/stores';

	export let data: any;
	$: ({ ProductDetail } = data);

	$: webId = $page.url.searchParams.get('webId') || null;
</script>

<SingleProductCard product={ProductDetail} inventoryWebId={webId} />
