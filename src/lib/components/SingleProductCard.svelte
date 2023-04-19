<script lang="ts">
	import { graphql } from '$houdini';
	import { get } from 'svelte/store';

	import { basket } from '$lib/basket';
	import { addToast } from '$lib/notifications';
	import { invalidateAll } from '$app/navigation';

	export let product: any;
	export let sku: string | null;

	$: inventory =
		sku != null
			? $product.data?.productByWebId?.product?.find((i: any) => i.sku == sku)
			: $product.data?.productByWebId?.product?.[0];

	const addOneItemToBasket = graphql(`
		mutation addOneItemToBasket($webId: String!, $productInventorySku: String!) {
			addToBasket(webId: $webId, productInventorySku: $productInventorySku, quantity: 1) {
				webId
			}
		}
	`);

	const addItemToCart = async (sku: string) => {
		const webId = await get(basket).webId;
		await addOneItemToBasket.mutate({ webId: webId, productInventorySku: sku });
		invalidateAll();
		addToast({
			message: 'Added 1 to basket!',
			type: 'success',
			dismissible: true,
			timeout: 3000
		});
	};
</script>

{#if $product.fetching}
	<p>Loading...</p>
{:else if $product.error}
	<p>Error: {$product.error.message}</p>
{:else if $product.data}
	<div id={`#${inventory.sku}`} class="card mx-96 my-8">
		<div class="card__title">
			<div class="icon">
				<a href="/"><i class="fa fa-arrow-left" />←</a>
			</div>
			{#each $product.data?.productByWebId?.category as category}
				&nbsp;<span class="badge badge-primary badge-lg">{category.name}</span>
			{/each}
		</div>
		<div class="card__body">
			<div class="half">
				<div class="featured_text">
					<h1>{$product.data?.productByWebId?.name}</h1>
					<p class="sub">{inventory?.brand?.name}</p>
					<p class="price">{inventory?.storePrice}€</p>
				</div>
				<div class="carousel carousel-center rounded-box">
					{#each inventory.productImages as image}
						<div class="image carousel-item">
							<img
								class="rounded-xl h-96 w-96 object-cover object-center"
								src={image.imgUrl}
								alt=""
							/>
						</div>
					{/each}
				</div>
			</div>
			<div class="half">
				<div class="description">
					<p>
						{$product.data?.productByWebId?.description}
					</p>
				</div>
				<table class="table-auto">
					<tbody>
						{#each Object.keys(inventory.attributes) as attribute}
							<tr>
								<td class="px-4 py-2">{attribute}</td>
								<td class="px-4 py-2">{inventory.attributes[attribute]}</td>
							</tr>
						{/each}
					</tbody>
				</table>
				<span class="stock"><i class="fa fa-pen" /> In stock</span>
				<div class="reviews">
					<ul class="stars">
						<li><i class="fa fa-star" /></li>
						<li><i class="fa fa-star" /></li>
						<li><i class="fa fa-star" /></li>
						<li><i class="fa fa-star" /></li>
						<li><i class="fa fa-star-o" /></li>
					</ul>
					<!-- <span>(64 reviews)</span> -->
				</div>
			</div>
		</div>
		<div class="card__footer">
			<div class="recommend">
				<p>Inserted by <b>{$product.data?.productByWebId?.owner.username}</b></p>
				<!-- <h3>{$product.data?.productByWebId?.owner.username}</h3> -->
			</div>
			<div class="action">
				<button
					type="button"
					on:click={() => {
						addItemToCart(inventory.sku);
					}}>Add to cart</button
				>
			</div>
		</div>
		<div class="flex justify-center py-2 gap-2">
			{#each $product.data?.productByWebId?.product as inventory, i}
				<a
					href={`/products/${$product.data?.productByWebId?.webId}?sku=${inventory.sku}`}
					class="btn btn-xs">{i}</a
				>
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	@import '$lib/styles/product.scss';
</style>
