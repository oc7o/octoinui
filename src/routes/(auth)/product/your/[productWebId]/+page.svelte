<script lang="ts">
	import { graphql, DeleteProductInventory } from '$houdini';
	import { invalidateAll } from '$app/navigation';

	import CheckIcon from '$lib/components/icons/Check.svelte';
	import XMarkIcon from '$lib/components/icons/XMark.svelte';
	import ViewIcon from '$lib/components/icons/View.svelte';
	import BinIcon from '$lib/components/icons/Bin.svelte';
	import EditIcon from '$lib/components/icons/Edit.svelte';

	const deleteProductInventory: DeleteProductInventory = graphql`
		mutation DeleteProductInventory($webId: String!) {
			deleteProductInventory(webId: $webId)
		}
	`;

	export let data: any;
	$: ({ YourProductInventories } = data);
</script>

{#if $YourProductInventories.fetching}
	<div class="flex justify-center my-16">
		<div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64" />
	</div>
{:else}
	<div class="mx-24">
		<div class="mx-24 my-8">
			<div class="overflow-x-auto w-full">
				<table class="table w-full">
					<!-- head -->
					<thead>
						<tr>
							<th
								><div class="text-sm breadcrumbs">
									<ul>
										<li><a href="/product/your">Your Products</a></li>
										<li><a>{$YourProductInventories.data.productByWebId.name}</a></li>
									</ul>
								</div></th
							>
						</tr>
					</thead>
				</table>
			</div>
		</div>

		<div class="flex justify-center">
			<div class="card w-full mx-24 bg-base-100 shadow-xl">
				<div class="card-body">
					<!-- TODO: Update following -->
					<form action="/product/create" method="POST" enctype="multipart/form-data">
						<h2 class="card-title">Update Product</h2>
						<div class="form-control w-full max-w-xs">
							<label class="label">
								<span class="label-text">Name</span>
							</label>
							<input
								name="name"
								type="text"
								placeholder="Type here"
								value={$YourProductInventories.data.productByWebId.name}
								class="input input-bordered w-full max-w-xs"
							/>
						</div>
						<div class="form-control">
							<label class="label">
								<span class="label-text">Description</span>
							</label>
							<textarea
								name="description"
								value={$YourProductInventories.data.productByWebId.description}
								class="textarea textarea-bordered h-24"
								placeholder="Bio"
							/>
						</div>
						<div class="form-control w-full max-w-xs">
							<label class="label">
								<span class="label-text">Category</span>
							</label>
							<select name="category" class="select select-bordered">
								{#each $YourProductInventories.data.categories as category}
									{#if $YourProductInventories.data.productByWebId.category[0].slug === category.slug}
										<option value={category.slug} selected>{category.name}</option>
									{:else}
										<option value={category.slug}>{category.name}</option>
									{/if}
								{/each}
							</select>
						</div>
						{#if $YourProductInventories.data.productByWebId.inventories.length > 0}
							<div class="form-control w-full max-w-xs mt-4">
								<label class="label cursor-pointer">
									<span class="label-text">Is Active</span>
									<input
										name="isActive"
										type="checkbox"
										class="toggle"
										checked={$YourProductInventories.data.productByWebId.isActive}
									/>
								</label>
							</div>
						{/if}
						<div class="card-actions justify-end">
							<button class="btn btn-primary">Save</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		{#if $YourProductInventories.data.productByWebId.inventories.length == 0}
			<div class="flex justify-center my-16">
				<p
					class="text-5xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 text-white px-12 py-3"
				>
					Your don't have any inventories yet
				</p>
			</div>
			<a
				class="flex justify-center mx-96 btn btn-primary"
				href={`/product/your/${$YourProductInventories.data.productByWebId.webId}/create`}
				>Create One</a
			>
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
											<li><a>{$YourProductInventories.data.productByWebId.name} Inventories</a></li>
											<li>
												<a
													href={`/product/your/${$YourProductInventories.data.productByWebId.webId}/create`}
													>Create</a
												>
											</li>
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
								<th>Store Price</th>
								<th />
							</tr>
						</thead>
						<tbody>
							<!-- row -->
							{#each $YourProductInventories.data.productByWebId.inventories as inventory}
								<tr>
									<td>
										<div class="flex items-center space-x-3">
											<div class="avatar">
												<div class="mask mask-squircle w-12 h-12">
													<img src={inventory.productImages[0]?.image} />
													<!-- change src to correct img -->
												</div>
											</div>
											<div>
												<div class="font-bold">[Placeholder]</div>
												<div class="text-sm opacity-50">{inventory.webId}</div>
											</div>
										</div>
									</td>
									<td>
										{#if inventory.isActive}<CheckIcon />{:else}<XMarkIcon />{/if}
									</td>
									<td> / </td>
									<td> {inventory.storePrice}€ </td>
									<th>
										<a
											class="btn btn-ghost btn-xs"
											href={`/product/your/${$YourProductInventories.data.productByWebId.webId}/inv/${inventory.webId}`}
										>
											<ViewIcon /></a
										>
										<a class="btn btn-ghost btn-xs"><EditIcon /></a>
										<button
											class="btn btn-ghost btn-xs"
											on:click={async () => {
												const res = await deleteProductInventory.mutate({
													webId: inventory.webId
												});
												await YourProductInventories.fetch({ policy: 'NetworkOnly' });
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
