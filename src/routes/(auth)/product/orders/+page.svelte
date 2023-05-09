<script lang="ts">
	import { graphql } from '$houdini';
	import { invalidateAll } from '$app/navigation';

	import CheckIcon from '$lib/components/icons/Check.svelte';
	import XMarkIcon from '$lib/components/icons/XMark.svelte';
	import ViewIcon from '$lib/components/icons/View.svelte';
	import BinIcon from '$lib/components/icons/Bin.svelte';
	import EditIcon from '$lib/components/icons/Edit.svelte';

	export let data: any;
	$: ({ YourOrders } = data);
</script>

{#if $YourOrders.loading}
	<p>Loading...</p>
{:else if $YourOrders.errors}
	<p>Errors: {JSON.stringify($YourOrders.errors)}</p>
{:else if $YourOrders.data}
	<div class="mx-24">
		{#if $YourOrders.data.myOrders.length == 0}
			<div class="flex justify-center my-16">
				<p
					class="text-5xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 text-white px-12 py-3"
				>
					Your don't have any orders yet
				</p>
			</div>
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
								<th>Order_ID</th>
								<th>Status</th>
								<th>Created_At</th>
								<th>Amount</th>
								<th />
							</tr>
						</thead>
						<tbody>
							<!-- row -->
							{#each $YourOrders.data.myOrders as order}
								<tr>
									<td>
										<div class="flex items-center space-x-3">
											<div class="avatar">
												<div class="mask mask-squircle w-12 h-12">
													<!-- <img src={product?.productInventory?.productImages[0]?.image} /> -->
													<!-- change src to correct img -->
												</div>
											</div>
											<div>
												<div class="font-bold">
													{order?.invoice?.invoiceId
														? order.invoice.invoiceId
														: 'No Invoice found...'}
												</div>
												<!-- <div class="text-sm opacity-50">{product.webId}</div> -->
											</div>
										</div>
									</td>
									<td>
										{order.status}
										<!-- {#if product.isActive}<CheckIcon />{:else}<XMarkIcon />{/if} -->
									</td>
									<td> {order.createdAt} </td>
									<td> {order.totalPrice}€ </td>
									<th>
										<a class="btn btn-ghost btn-xs" href="#">
											<ViewIcon />
										</a>
										<!-- <a class="btn btn-ghost btn-xs" href={`/product/your/${product.webId}`}>
											<ListIcon /></a
										> -->
										<!-- <a class="btn btn-ghost btn-xs" href={`/product/your/${product.webId}/edit`}>
											<EditIcon /></a
										> -->
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
