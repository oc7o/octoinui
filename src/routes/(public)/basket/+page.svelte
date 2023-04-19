<script lang="ts">
	import { graphql } from '$houdini';
	import { invalidateAll } from '$app/navigation';
	import BinIcon from '$lib/components/icons/Bin.svelte';
	import ViewIcon from '$lib/components/icons/View.svelte';

	const removeFromBasket = graphql(`
		mutation RemoveFromBasket($productInventorySku: String!, $webId: String!) {
			removeFromBasket(productInventorySku: $productInventorySku, webId: $webId) {
				basketObjects {
					webId
				}
			}
		}
	`);

	const removeBasketMutation = graphql(`
		mutation DeleteBasket($webId: String!) {
			deleteBasket(webId: $webId) {
				webId
			}
		}
	`);

	async function removeItemFromBasket(sku: string, webId: string) {
		await removeFromBasket.mutate({ productInventorySku: sku, webId: webId });
		invalidateAll();
	}

	// async function removeOneItemFromBasket(sku: string, webId: string) {
	// 	await removeFromBasket.mutate({ productInventorySku: sku, webId: webId });
	// 	invalidateAll();
	// }

	// async function addOneItemToBasket(sku: string, webId: string) {
	// 	await removeFromBasket.mutate({ productInventorySku: sku, webId: webId });
	// 	invalidateAll();
	// }

	async function removeBasket(webId: string) {}
	import { basket } from '$lib/basket';
</script>

<div class="flex justify-center my-16">
	<p
		class="box-decoration-clone bg-gradient-to-r from-lime-500 to-emerald-500 text-white text-5xl font-bold px-12 py-3"
	>
		Your Basket
	</p>
</div>

<!-- <h1>{JSON.stringify(data.basket?.basketObjects)}</h1>
<h1>{JSON.stringify(basket)}</h1>
<h1>{typeof basket}</h1> -->

<div class="mx-24">
	{#if $basket != undefined && $basket != null}
		{#if $basket.basketObjects.length == 0}
			<div class="flex justify-center my-16">
				<p
					class="text-5xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 text-white px-12 py-3"
				>
					Your basket is empty
				</p>
			</div>
		{:else}
			<div class="overflow-x-auto w-full">
				<table class="table w-full">
					<!-- head -->
					<thead>
						<tr>
							<th>Item</th>
							<th>Quantity</th>
							<th>Price</th>
							<th />
						</tr>
					</thead>
					<tbody>
						<!-- row -->
						{#each $basket.basketObjects as inventory}
							<tr>
								<td>
									<div class="flex items-center space-x-3">
										<div class="avatar">
											<div class="mask mask-squircle w-12 h-12">
												<img src={inventory.productInventory.productImages[0].imgUrl} />
												<!-- change src to correct img -->
											</div>
										</div>
										<div>
											<div class="font-bold">{inventory.productInventory.product.name}</div>
											<div class="text-sm opacity-50">{inventory.productInventory.sku}</div>
										</div>
									</div>
								</td>
								<td>
									{inventory.quantity}
								</td>
								<td>{inventory.productInventory.storePrice}€</td>
								<th>
									<a
										class="btn btn-ghost btn-xs"
										href={`/products/${inventory.productInventory.product.webId}?sku=${inventory.productInventory.sku}`}
										><ViewIcon />
									</a>
									<button
										class="btn btn-error btn-xs"
										on:click={() =>
											removeItemFromBasket(inventory.productInventory.sku, $basket?.webId)}
										><BinIcon />
									</button>
								</th>
							</tr>
						{/each}
					</tbody>
					<!-- foot -->
					<tfoot>
						<tr>
							<th>Total</th>
							<th>{$basket?.totalQty}</th>
							<th>{$basket?.totalPrice}€</th>
							<th />
						</tr>
					</tfoot>
				</table>
			</div>
		{/if}
		{#if $basket.basketObjects.length != 0}
			<div class="flex justify-end my-16">
				<a class="btn btn-primary" href="/checkout">Check Out</a>
				<button class="btn btn-error" on:click={() => removeBasket($basket?.webId)}
					>Delete Basket</button
				>
			</div>
		{/if}
	{:else}
		<div class="flex justify-center my-16">
			<p
				class="text-5xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 text-white px-12 py-3"
			>
				Could not fetch basket
			</p>
		</div>
	{/if}
</div>
