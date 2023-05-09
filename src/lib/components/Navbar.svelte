<script lang="ts">
	import { user } from '$lib/auth';
	import { basket } from '$lib/basket';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let search = $page.url.searchParams.get('search');
</script>

<!-- Search Modal -->
<input type="checkbox" id="search-modal" class="modal-toggle" />
<label for="earch-modal" class="modal cursor-pointer">
	<label class="modal-box relative" for="">
		<label
			class="btn btn-sm btn-error btn-circle absolute right-2 top-2"
			for="search-modal"
			on:mousedown={() => {
				goto(`/`);
			}}>✕</label
		>
		<div class="btn-group w-full">
			<input
				type="text"
				placeholder="Search..."
				class="input input-bordered w-full"
				bind:value={search}
			/>

			<label
				for="search-modal"
				class="btn btn-primary"
				on:mousedown={() => {
					if (search !== '') {
						goto(`/?search=${search ? search : ''}`);
					} else {
						goto(`/`);
					}
				}}
				><svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/></svg
				></label
			>
		</div>
	</label>
</label>

<div class="navbar bg-gradient-to-r from-lime-500 to-emerald-500">
	<!-- ⬆ text-white -->
	<!-- Navbar Start -->
	<div class="navbar-start">
		<div class="dropdown">
			<label for="side-drawer" class="btn btn-primary drawer-button">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block w-5 h-5 stroke-current"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/></svg
				>
			</label>
			<ul
				tabindex="0"
				class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
			>
				<li><a href="/">Homepage</a></li>
				<li><a>Portfolio</a></li>
				<li><a href="/about">About</a></li>
			</ul>
		</div>
	</div>
	<!-- Navbar Start End -->

	<!-- Navbar Center  -->
	<div class="navbar-center">
		<a class="btn btn-ghost normal-case text-xl" href="/">Sloow</a>
	</div>
	<!-- Navbar Center End-->

	<!-- Navbar End -->
	<div class="navbar-end">
		<!-- Search Button -->
		<label for="search-modal" class="btn btn-ghost btn-circle">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/></svg
			>
		</label>
		<!-- Search Button End -->

		<!-- Shopping Cart -->
		<div class="dropdown dropdown-end">
			<div class="indicator">
				{#if $basket.totalQty > 0}
					<span
						class="mx-3 my-2 indicator-item indicator-bottom indicator-start badge badge-secondary"
						>{$basket.totalQty}</span
					>
				{/if}
				<span tabindex="0" class="btn btn-ghost btn-circle">
					<div class="indicator">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
							/></svg
						>
						<!-- <span class="badge badge-sm indicator-item">8</span> -->
					</div>
				</span>
			</div>
			<div tabindex="0" class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
				<div class="card-body">
					<span class="font-bold text-lg">{$basket.totalQty} Items</span>
					<span class="text-info">Subtotal: {$basket.totalPrice}€</span>
					<div class="card-actions">
						<a class="btn btn-primary btn-block" href="/basket">View basket</a>
					</div>
				</div>
			</div>
		</div>
		<!-- Shopping Cart End -->

		{#if $user !== null}
			<!-- User Account -->
			<div class="dropdown dropdown-end">
				<span tabindex="0" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img src={$user.profileImage} />
					</div>
				</span>
				<ul
					tabindex="0"
					class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li>
						<a class="justify-between" href={`/users/${$user.username}`}> Profile </a>
					</li>
					<li>
						<a href="/account" class="justify-between"> Account </a>
					</li>
					<li><a>Settings</a></li>
					<li><form method="POST" action="/user?/logout"><button>Logout</button></form></li>
				</ul>
			</div>
			<!-- User Account End -->
		{:else}
			<!-- Login Button -->
			<a class="btn btn-accent" href="/user/login">Login</a>
			<!-- Login Button End -->
		{/if}
	</div>
</div>
