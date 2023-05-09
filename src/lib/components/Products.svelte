<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { graphql } from '$houdini';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';

	// import '$lib/styles/products.scss';

	let limit: number = 12;
	$: offset = Number($page.url.searchParams.get('offset'));
	$: search = $page.url.searchParams.get('search');
	$: path = $page.url.pathname;

	export let products: any;

	function showImgContent(e: MouseEvent) {
		if (browser) {
			// Runs before data fetch...
			const imgContent = document.querySelectorAll('.img-content-hover');
			for (var i = 0; i < imgContent.length; i++) {
				let x = e.pageX;
				let y = e.pageY;
				imgContent[i].style.transform = `translate3d(${x}px, ${y}px, 0)`;
			}
		}
	}

	const goToProduct = (webId: string) => {
		goto(`/products/${webId}`);
	};
</script>

{#if $products.fetching}
	<p>Loading...</p>
{:else if $products.errors}
	<p>Error: {JSON.stringify($products.errors)}</p>
{:else if $products.data}
	<section class="gallery" on:mousemove={showImgContent}>
		<div class="container">
			<div class="grid">
				{#if $products.data?.products?.items.length === 0}
					<p class="text-2xl text-center">No products found</p>
				{:else}
					{#each $products.data.products.items as product}
						<div
							class="column-xs-12 column-md-4"
							on:mousedown={() => {
								goToProduct(product.webId);
							}}
						>
							<figure class="img-container">
								<figcaption class="img-content">
									<h2 class="title">{product.name}</h2>
									<h3 class="category">Starting From: {product.startingFromPrice}</h3>
								</figcaption>
								<img src={product.defaultImage?.image} alt="..." />
								<span class="img-content-hover">
									<h2 class="title">{product.name}</h2>
									<h3 class="category">Starting From: {product.startingFromPrice}€</h3>
								</span>
							</figure>
						</div>
					{/each}
				{/if}
			</div>
			<center>
				<div class="btn-group mt-4">
					<button
						class="btn btn-primary"
						on:click={() => {
							if (offset > 0) {
								if (offset - limit == 0) {
									goto(`${path}?${search ? '&search=' + search : ''}`);
								} else {
									goto(`${path}?offset=${offset - limit}${search ? '&search=' + search : ''}`);
								}
							}
						}}>«</button
					>
					<button class="btn btn-primary">Page {((offset / limit) >> 0) + 1}</button>
					<button
						class="btn btn-primary"
						on:click={() => {
							console.log($products.data.products.totalItemsCount, offset, limit);

							if ($products.data.products.totalItemsCount >= offset + limit) {
								goto(`${path}?offset=${offset + limit}${search ? '&search=' + search : ''}`);
							}
						}}>»</button
					>
				</div>
			</center>
		</div>
	</section>
{/if}

<style lang="scss">
	@import '$lib/styles/products.scss';
</style>
