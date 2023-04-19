<!-- <script lang="ts">
	import OrderLookup from '$lib/components/OrderLookup.svelte';
</script>

<OrderLookup /> -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { graphql } from '$houdini';
	import { page } from '$app/stores';

	export let data: any;

	$: display = $page.url.searchParams.get('code') ? true : false;
	let code: string;

	$: ({ CheckOrder } = data);
</script>

{#if !display}
	<div class="flex justify-center">
		<div class="card w-4/6 mt-16 bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">Lookup Order</h2>
				<div class="form-control">
					<label class="label">
						<span class="label-text">12-digit code</span>
					</label>
					<input
						bind:value={code}
						name="code"
						type="text"
						placeholder="e.g. 0123456789az"
						class="input input-bordered w-full"
					/>
				</div>
				<div class="card-actions justify-end">
					<button
						class="btn btn-primary"
						on:click={() => {
							goto(`/check-order?code=${code}`);
							display = true;
						}}>Look Up</button
					>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="flex justify-center">
		<div class="card w-4/6 mt-16 bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">Order Lookup</h2>
				{JSON.stringify($CheckOrder)}
			</div>
		</div>
	</div>
{/if}
