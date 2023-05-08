<script lang="ts">
	export let artists: any;
</script>

{#if $artists.fetching}
	<p>Loading...</p>
{:else if $artists.error}
	<p>Error: {$artists.error.message}</p>
{:else if $artists.data}
	<div class="carousel carousel-center rounded-box">
		{#each $artists.data?.top20Users as user}
			<div class="carousel-item mx-4 card bg-base-100 shadow-xl w-96 h-[32rem]">
				<figure>
					<img src={user.profileImage} class="w-full h-96 object-cover object-top" />
				</figure>
				<div class="stats stats-vertical lg:stats-horizontal">
					<div class="stat">
						<div class="stat-title">Sold this month</div>
						<div class="stat-value">{user.amountEarnedThisMonth}</div>
						<div class="stat-desc">All time:</div>
					</div>

					<div class="stat">
						<div class="stat-title"><b>{user.username}</b></div>
						<div class="stat-value">
							<a href={`/users/${user.username}`} class="btn btn-primary">View</a>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}
