<script lang="ts">
	import CheckIcon from '$lib/components/checkIcon.svelte';
</script>

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

			<div class="card-actions justify-center mt-12">
				<a class="btn btn-primary" href="/">Ok</a>
			</div>
		</div>
	</div>
</div>
