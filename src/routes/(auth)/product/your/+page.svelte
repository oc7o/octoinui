<script lang="ts">
	import { browser } from '$app/environment';
	import { get } from 'svelte/store';
	import { goto, invalidateAll } from '$app/navigation';
	import { graphql } from '$houdini';

	import ListIcon from '$lib/components/icons/List.svelte';
	import CheckIcon from '$lib/components/icons/Check.svelte';
	import XMarkIcon from '$lib/components/icons/XMark.svelte';
	import EditIcon from '$lib/components/icons/Edit.svelte';
	import BinIcon from '$lib/components/icons/Bin.svelte';

	export let data: any;

	$: ({ YourProducts } = data);

	const deleteProduct = graphql`
		mutation deleteProduct($webId: String!) {
			deleteProduct(webId: $webId)
		}
	`;
</script>

{#if $YourProducts.loading}
	<p>Loading...</p>
{:else if $YourProducts.errors}
	<p>Errors: {JSON.stringify($YourProducts.errors)}</p>
{:else if $YourProducts.data}
	<div class="mx-24">
		{#if $YourProducts.data.meProducts.items.length == 0}
			<div class="flex justify-center my-16">
				<p
					class="text-5xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 text-white px-12 py-3"
				>
					Your don't have any products yet
				</p>
			</div>
			<a class="flex justify-center mx-96 btn btn-primary" href="/product/create">Create One</a>
		{:else}
			<div class="mx-24 my-8">
				<div class="overflow-x-auto w-full mb-8">
					<table class="table w-full">
						<!-- head -->
						<thead>
							<tr>
								<th
									><div class="text-sm breadcrumbs">
										<ul>
											<li><a>Your Products</a></li>
										</ul>
									</div></th
								>
							</tr>
						</thead>
					</table>
				</div>
				<div class="overflow-x-auto w-full">
					<table class="table w-full">
						<!-- head -->
						<thead>
							<tr>
								<th>Item</th>
								<th>Active</th>
								<th>Inventories</th>
								<th>Starting From</th>
								<th />
							</tr>
						</thead>
						<tbody>
							<!-- row -->
							{#each $YourProducts.data.meProducts.items as product}
								<tr>
									<td>
										<div class="flex items-center space-x-3">
											<div class="avatar">
												<div class="mask mask-squircle w-12 h-12">
													<img src={product?.productInventory?.productImages[0]?.image} />
													<!-- change src to correct img -->
												</div>
											</div>
											<div>
												<div class="font-bold">{product.name}</div>
												<div class="text-sm opacity-50">{product.webId}</div>
											</div>
										</div>
									</td>
									<td>
										{#if product.isActive}<CheckIcon />{:else}<XMarkIcon />{/if}
									</td>
									<td> / </td>
									<td> {product.startingFromPrice}€ </td>
									<th>
										<a class="btn btn-ghost btn-xs" href={`/product/your/${product.webId}`}>
											<ListIcon /></a
										>
										<button
											class="btn btn-ghost btn-xs"
											on:click={async () => {
												const { errors } = await deleteProduct.mutate({ webId: product.webId });
												if (errors) {
													console.log(errors);
													return;
												} else {
													await invalidateAll();
												}
											}}><BinIcon /></button
										>
									</th>
								</tr>
							{/each}
						</tbody>
						<!-- foot -->
						<tfoot>
							<tr>
								<!-- <th>Total</th>
							<th>{data.basket?.totalQty}</th>
							<th>{data.basket?.totalPrice}€</th>
							<th /> -->
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		{/if}
	</div>
{/if}
