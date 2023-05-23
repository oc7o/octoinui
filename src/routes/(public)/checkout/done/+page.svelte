<script lang="ts">
	import CheckIcon from '$lib/components/icons/Check.svelte';

	export let data: any;
</script>

{#if data.fetching}
	<p>Fetching...</p>
{:else if data.errors}
	<p>Errors:</p>
	<ul>
		{#each data.errors as error}
			<li>{error.message}</li>
		{/each}
	</ul>
{:else if data.data.basket.order == null}
	<div class="flex justify-center my-16">
		<p
			class="text-5xl font-bold bg-gradient-to-r from-lime-500 to-emerald-500 text-white px-12 py-3"
		>
			You don't have a order yet!
		</p>
	</div>
{:else}
	<div class="flex justify-center my-16">
		<div class="card w-4/5 bg-base-100 shadow-xl">
			<div class="card-body">
				<ul class="steps steps-horizontal">
					<li class="step step-primary" data-content="🤷‍♂️">Kontakt</li>
					<li class="step step-primary" data-content="💸">Buy</li>
					<li class="step step-primary" data-content="✅">Finish</li>
				</ul>
				<p class="mx-auto mt-16 text-4xl">Done</p>
				<p class="mx-auto my-1 text-2xl">Thank you for your order!</p>
				<p class="mx-auto my-1 text-2xl">Your Order-ID is: {data.data.basket.order.webId}</p>

				<div class="card-actions justify-center mt-12">
					<a class="btn btn-primary" href="/">Ok</a>
				</div>
			</div>
		</div>
	</div>
{/if}
