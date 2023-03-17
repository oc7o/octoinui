<script>
	import { graphql } from '$houdini';
	import { user } from '$lib/auth';
</script>

<div class="drawer">
	<input id="side-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<slot />
	</div>
	<div class="drawer-side">
		<label for="side-drawer" class="drawer-overlay" />
		<ul class="menu p-4 w-80 bg-base-100 text-base-content">
			<!-- Sidebar content here -->
			<li><a>Sidebar Item 1</a></li>
			{#if $user !== null}
				<li><a href="/product/new">Create a New Product</a></li>
				<li><a href="/product/new">Your Products</a></li>
			{/if}
		</ul>
	</div>
</div>
