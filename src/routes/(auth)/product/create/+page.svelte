<script lang="ts">
	import { graphql } from '$houdini';
	import { addToast } from '$lib/notifications';
	import { redirect } from '@sveltejs/kit';
	import { goto, invalidate } from '$app/navigation';

	export let data: any;

	$: ({ CategoryList } = data);

	let name: string;
	let description: string;
	let category: string;

	const createProduct = graphql(`
		mutation CreateProduct($name: String!, $description: String!, $category: String!) {
			createProduct(name: $name, description: $description, category: $category) {
				name
				webId
				category {
					name
				}
			}
		}
	`);
</script>

<div class="flex justify-center">
	<div class="card w-4/6 mt-16 bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Create Product</h2>
			<div class="form-control w-full max-w-xs">
				<label class="label">
					<span class="label-text">Name</span>
				</label>
				<input
					name="name"
					type="text"
					placeholder="Type here"
					class="input input-bordered w-full max-w-xs"
					bind:value={name}
				/>
			</div>
			<div class="form-control">
				<label class="label">
					<span class="label-text">Description</span>
				</label>
				<textarea
					name="description"
					class="textarea textarea-bordered h-24"
					placeholder="What makes it special?"
					bind:value={description}
				/>
			</div>
			{#if $CategoryList.fetching}
				<div class="form-control">
					<label class="label">
						<span class="label-text">Category</span>
					</label>
					<div class="loading loading-lg" />
				</div>
			{:else}
				<div class="form-control w-full max-w-xs">
					<label class="label">
						<span class="label-text">Category</span>
					</label>
					<select name="category" class="select select-bordered" bind:value={category}>
						<option disabled selected>Pick one</option>
						{#each $CategoryList.data.categories as category}
							<option value={category.slug}>{category.name}</option>
						{/each}
					</select>
				</div>
			{/if}
			<div class="card-actions justify-end">
				<button
					class="btn btn-primary"
					on:click={async () => {
						const { data, errors } = await createProduct.mutate({ name, description, category });

						if (errors) {
							addToast({
								message: 'Some problem occured!',
								type: 'error',
								dismissible: true,
								timeout: 10000
							});
							console.log('errors', errors);
							return;
						} else {
							addToast({
								message: 'Successfully created product!',
								type: 'success',
								dismissible: true,
								timeout: 10000
							});

							await goto('/product/your', { invalidateAll: true });
						}
					}}>Create</button
				>
			</div>
		</div>
	</div>
</div>
