<script lang="ts">
	import { CategoryListStore } from '$houdini';

	export let data: any;

	$: ({ CategoryList } = data);
</script>

<div class="flex justify-center">
	<div class="card w-4/6 mt-16 bg-base-100 shadow-xl">
		<div class="card-body">
			<form action="/product/create" method="POST">
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
						<select name="category" class="select select-bordered">
							<option disabled selected>Pick one</option>
							{#each $CategoryList.data.categories as category}
								<option value={category.slug}>{category.name}</option>
							{/each}
						</select>
					</div>
				{/if}
				<div class="card-actions justify-end">
					<button class="btn btn-primary">Create</button>
				</div>
			</form>
		</div>
	</div>
</div>
