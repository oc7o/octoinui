<script lang="ts">
	import { page } from '$app/stores';

	import Products from '$lib/components/Products.svelte';
	import Artists from '$lib/components/Artists.svelte';
	import { addToast } from '$lib/notifications';

	export let data: any;

	$: ({ Home } = data);

	let limit: number = 12;
	$: offset = Number($page.url.searchParams.get('offset'));
	$: search = $page.url.searchParams.get('search');
</script>

<div class="flex justify-center my-16">
	<p
		class="box-decoration-clone bg-gradient-to-r from-lime-500 to-emerald-500 text-white text-5xl font-bold px-12 py-3"
	>
		Top Sellers This Month
	</p>
</div>

<div class="mx-12 my-12">
	<Artists artists={Home} />
</div>

<div class="flex justify-center my-16">
	<p
		class="box-decoration-clone bg-gradient-to-r from-lime-500 to-emerald-500 text-white text-5xl font-bold px-12 py-3"
	>
		Most Inovative Products
	</p>
</div>

<div class="">
	<Products products={Home} />
</div>
<br />
