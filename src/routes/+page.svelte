<script lang="ts">
	import Products from '../lib/components/Products.svelte';
	import Artists from '../lib/components/Artists.svelte';

	/* @type { import('./$houdini').PageData } */
	export let data;
</script>

<div class="flex justify-center my-16">
	<p
		class="box-decoration-clone bg-gradient-to-r from-lime-500 to-emerald-500 text-white text-5xl font-bold px-12 py-3"
	>
		Unsere Top Verkäufer des Monats
	</p>
</div>

<div class="mx-12 my-12">
	<Artists />
</div>

<div class="flex justify-center my-16">
	<p
		class="box-decoration-clone bg-gradient-to-r from-lime-500 to-emerald-500 text-white text-5xl font-bold px-12 py-3"
	>
		Die innovativsten Produkte
	</p>
</div>

<div class="">
	<Products />
</div>
<br />
