<script lang="ts">
	export let data: any;

	$: ({ Account } = data);
</script>

<div class="flex justify-center my-8">
	<div class="stats bg-primary text-primary-content w-4/6">
		<div class="stat">
			<div class="stat-title">Current balance</div>
			<div class="stat-value">{$Account.data.me.balance} BTC</div>
			<div class="stat-actions">
				<button class="btn btn-sm btn-success">Withdrawal</button>
				<button class="btn btn-sm btn-error">deposit</button>
			</div>
		</div>
	</div>
</div>
