<!-- <div class="card w-96 bg-secondary text-secondary-content">
	<div class="card-body">
		<h2 class="card-title">Payment</h2>
		<p>Total Sum: {invoice.totalPrice}</p>
		<p>Pay until: {invoice.invoices[0].expiredAt}</p>
		<div class="card-actions justify-end">
			<a class="btn btn-primary" href={invoice.invoices[0].invoiceUrl}>Buy Now</a>
		</div>
	</div>
</div> -->
<script lang="ts">
	import CheckIcon from '$lib/components/icons/Check.svelte';
	import { graphql } from '$houdini';
	import { browser } from '$app/environment';
	import { basket } from '$lib/basket';
	export let data: any;
</script>

<!-- {JSON.stringify(data.createCaptcha)} -->
<div class="flex justify-center my-16">
	<div class="card w-4/5 bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title" />
			<ul class="steps steps-horizontal">
				<li class="step step-primary" data-content="🤷‍♂️">Contact</li>
				<li class="step" data-content="💸">Buy</li>
				<li class="step" data-content="✅">Finish</li>
			</ul>
			<form class="form-control mx-24 my-8" method="POST" action="/checkout">
				<div class="inline-flex">
					<div class="w-full max-w-xs ml-auto mr-2">
						<span class="label">
							<span class="label-text">Vorname</span>
							<span class="label-text-alt"><CheckIcon /></span>
						</span>
						<input
							name="firstname"
							type="text"
							placeholder="Max"
							class="input input-bordered w-full max-w-xs"
						/>
					</div>
					<div class="w-full max-w-xs ml-2 mr-auto">
						<span class="label">
							<span class="label-text">Nachname</span>
							<span class="label-text-alt"><CheckIcon /></span>
						</span>
						<input
							name="lastname"
							type="text"
							placeholder="Mustermann"
							class="input input-bordered w-full max-w-xs"
						/>
					</div>
				</div>
				<div class="inline-flex">
					<div class="w-full max-w-xs ml-auto mr-2">
						<span class="label">
							<span class="label-text">Stadt</span>
						</span>
						<input
							name="city"
							type="text"
							placeholder="z.B. Berlin"
							class="input input-bordered w-full max-w-xs"
						/>
					</div>
					<div class="w-full max-w-xs ml-2 mr-auto">
						<span class="label">
							<span class="label-text">Straße, Hausnummer</span>
						</span>
						<input
							name="street"
							type="text"
							placeholder="z.B. Musterstraße, 1"
							class="input input-bordered w-full max-w-xs"
						/>
					</div>
				</div>
				<div class="inline-flex">
					<div class="w-full max-w-xs ml-auto mr-2">
						<span class="label">
							<span class="label-text">PLZ</span>
						</span>
						<input
							name="zipCode"
							type="text"
							placeholder="z.B. 12345"
							class="input input-bordered w-full max-w-xs"
						/>
					</div>
					<div class="w-full max-w-xs ml-2 mr-auto">
						<span class="label">
							<span class="label-text">E-Mail</span>
						</span>
						<input
							name="email"
							type="text"
							placeholder="z.B. user@sloow.de"
							class="input input-bordered w-full max-w-xs"
						/>
					</div>
				</div>

				<div class="flex justify-center my-4">
					<img src={data.createCaptcha.image} class="w-96" />
				</div>
				<input type="hidden" name="captchaWebId" value={data.createCaptcha.webId} />
				<input type="hidden" name="basketWebId" value={$basket.webId} />
				<div class="flex justify-center">
					<div class="w-full max-w-xs">
						<span class="label">
							<span class="label-text">Captcha</span>
						</span>
						<input
							name="captchaText"
							type="text"
							placeholder="z.B. abcdef"
							class="input input-bordered w-full max-w-xs"
						/>
					</div>
				</div>

				<div class="card-actions justify-center mt-12">
					<button class="btn btn-primary">Buy Now</button>
				</div>
			</form>
		</div>
	</div>
</div>
