<script lang="ts">
	import CheckIcon from '$lib/components/icons/Check.svelte';
	import XMarkIcon from '$lib/components/icons/XMark.svelte';
	import ViewIcon from '$lib/components/icons/View.svelte';

	export let data: any;
	$: ({ YourProductInventories } = data);
</script>

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
					{#if $YourProductInventories.data.productByWebId.product.length == 0}
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
	{#if $YourProductInventories.data.productByWebId.product.length == 0}
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
						{#each $YourProductInventories.data.productByWebId.product as inventory}
							<tr>
								<td>
									<div class="flex items-center space-x-3">
										<div class="avatar">
											<div class="mask mask-squircle w-12 h-12">
												<img src={inventory.productImages[0]?.imgUrl} />
												<!-- change src to correct img -->
											</div>
										</div>
										<div>
											<div class="font-bold">[Placeholder]</div>
											<div class="text-sm opacity-50">{inventory.sku}</div>
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
										href={`/product/your/${$YourProductInventories.data.productByWebId.webId}/inv/${inventory.sku}`}
									>
										<ViewIcon /></a
									>
									<!-- <a
								class="btn btn-ghost btn-xs"
								href={`/products/${inventory.productInventory.product.webId}/${inventory.productInventory.sku}`}
								><svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							</a>
							<button
								class="btn btn-error btn-xs"
								on:click={() =>
									removeItemFromBasket(inventory.productInventory.sku, data.basket?.webId)}
								><svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
									/>
								</svg>
							</button> -->
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
