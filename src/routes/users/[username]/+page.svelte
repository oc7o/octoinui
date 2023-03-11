<script>
	import Products from '$lib/components/Products.svelte';

	export let data;

	$: ({ UserPage } = data);
</script>

{#if $UserPage.data && $UserPage.data.user}
	<div class="card bg-base-100 shadow-xl m-16">
		<div class="card-body">
			<h2 class="card-title">
				<div class="avatar">
					<div class="w-32 mask mask-hexagon"><img src={$UserPage.data.user.profileImage} /></div>
				</div>
				{$UserPage.data.user.username}
			</h2>

			<!-- <div class="card-actions justify-end">
			<button class="btn btn-primary">Buy Now</button>
		</div> -->
		</div>
	</div>

	<Products props={{ user: $UserPage.data.user.username }} />
{/if}
