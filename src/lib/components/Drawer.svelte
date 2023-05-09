<script>
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
			<li><a href="/about">About</a></li>
			<li><a href="/check-order">Check Your Order</a></li>
			{#if $user !== null}
				<li><a href="/product/create">Create a New Product</a></li>
				<li><a href="/product/your">Your Products</a></li>
				<li><a href="/product/orders">Your Orders</a></li>
			{/if}
		</ul>
	</div>
</div>
