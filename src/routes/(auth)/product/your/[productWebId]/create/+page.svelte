<script lang="ts">
	import { graphql, CreateProductInventoryMutationStore } from '$houdini';
	import { addToast } from '$lib/notifications';
	import { goto } from '$app/navigation';
	export let data: any;

	$: ({ CreateProductInventory } = data);

	let key_fields: string[] = [];
	let value_fields: string[] = [];

	let new_key = '';
	let new_value = '';

	let files: FileList = [];
	let storePrice = 0;
	let productType = '';

	const createProductInventory: CreateProductInventoryMutationStore = graphql`
		mutation CreateProductInventoryMutation(
			$productWebId: String!
			$productTypeWebId: String
			$storePrice: Decimal!
			$media: [MediaInputType!]
			$attributeValues: JSON
		) {
			createProductInventory(
				productWebId: $productWebId
				storePrice: $storePrice
				productTypeWebId: $productTypeWebId
				media: $media
				attributeValues: $attributeValues
			) {
				webId
			}
		}
	`;
</script>

{#if $CreateProductInventory.fetching}
	<div class="form-control">
		<label class="label">
			<span class="label-text">Product Type</span>
		</label>
		<div class="loading loading-lg" />
	</div>
{:else}
	<div class="flex justify-center">
		<div class="card w-4/6 mt-16 bg-base-100 shadow-xl">
			<div class="card-body">
				<!-- <form
				action={`/product/your/${$CreateProductInventory.data.productByWebId.webId}/create`}
				method="POST"
				enctype="multipart/form-data"
			> -->
				<h2 class="card-title">
					Create Inventory for <b>{$CreateProductInventory.data.productByWebId.name}</b>
				</h2>
				<!--
					Fields:
						- Store Price
						- Multi Image Upload
						- Product Types Dropdown
						- Key: Value
				-->
				<div class="form-control w-full max-w-xs my-2">
					<label class="label">
						<span class="label-text">Store Price</span>
					</label>
					<input
						name="storePrice"
						type="number"
						placeholder="Type here"
						class="input input-bordered w-full max-w-xs"
						min="0"
					/>
				</div>
				<div class="form-control w-full max-w-xs my-2">
					<label class="label">
						<span class="label-text">Product Image(s)</span>

						<input
							name="files"
							bind:files
							type="file"
							class="file-input file-input-primary w-full max-w-xs"
							accept="image/*"
							multiple
						/>
					</label>
				</div>
				<div class="form-control w-full max-w-xs">
					<label class="label">
						<span class="label-text">Product Type</span>
					</label>
					<select name="productType" class="select select-bordered" bind:value={productType}>
						<option disabled selected>Pick one</option>
						{#each $CreateProductInventory.data.productTypes as product_type}
							<option value={product_type.webId}>{product_type.name}</option>
						{/each}
					</select>
				</div>
				<br />
				<p>Product Attributes</p>
				<br />

				{#each key_fields as field, i}
					<div>
						<input
							bind:value={key_fields[i]}
							type="text"
							name="customKey"
							placeholder="Key"
							class="input input-bordered w-full max-w-xs"
						/>
						<input
							bind:value={value_fields[i]}
							type="text"
							name="customValue"
							placeholder="Value"
							class="input input-bordered w-full max-w-xs"
						/>
					</div>
				{/each}
				<br />
				<div>
					<input
						bind:value={new_key}
						name="customKey"
						type="text"
						placeholder="New Key"
						class="input input-bordered w-full max-w-xs"
					/>
					<input
						bind:value={new_value}
						name="customValue"
						type="text"
						placeholder="New Value"
						class="input input-bordered w-full max-w-xs"
					/>
					<button
						type="button"
						class="btn btn-primary"
						on:click={() => {
							if (new_key === '' || new_value === '') return;
							key_fields = [...key_fields, new_key];
							value_fields = [...value_fields, new_value];
							new_key = '';
							new_value = '';
						}}
					>
						Add
					</button>
				</div>

				<div class="form-control w-full max-w-xs">
					<label class="label">
						<span class="label-text" />
					</label>
				</div>

				<div class="card-actions justify-end">
					<a
						class="btn btn-ghost"
						href={`/product/your/${$CreateProductInventory.data.productByWebId.webId}`}>Back</a
					>
					<button
						class="btn btn-primary"
						on:click={async () => {
							let media = [];
							for (let i = 0; i < files.length; i++) {
								media.push({ image: files[i] });
							}
							// let attributeValues = {};
							// for (let i = 0; i < key_fields.length; i++) {
							// 	attributeValues[key_fields[i]] = value_fields[i];
							// }
							const res = await createProductInventory.mutate({
								productWebId: $CreateProductInventory.data.productByWebId.webId,
								storePrice: storePrice,
								productTypeWebId: productType,
								media: media
							});

							if (res.errors) {
								addToast({
									message: 'An error occured!',
									type: 'error',
									dismissible: true,
									timeout: 10000
								});
								console.log(res.errors);
							} else {
								addToast({
									message: 'Successfully created product!',
									type: 'success',
									dismissible: true,
									timeout: 10000
								});
								await goto(`/product/your/${$CreateProductInventory.data.productByWebId.webId}`);
							}
						}}>Create</button
					>
				</div>
				<!-- </form> -->
			</div>
		</div>
	</div>
{/if}
