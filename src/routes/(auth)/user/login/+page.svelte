<script lang="ts">
	import Toast from '$lib/components/Toast.svelte';
</script>

<div class="flex justify-center my-24">
	<div class="card w-96 bg-base-100 shadow-xl">
		<form method="POST" action="/user?/login">
			<div class="card-body">
				<div class="form-control w-full max-w-xs">
					<label class="label">
						<span class="label-text">Username</span>
					</label>
					<input
						name="username"
						type="text"
						placeholder="Username"
						class="input input-bordered w-full max-w-xs"
					/>
					<label class="label">
						<span class="label-text">Password</span>
					</label>
					<input
						name="password"
						type="password"
						placeholder="Password"
						class="input input-bordered w-full max-w-xs"
					/>
				</div>
				<div class="card-actions justify-center">
					<button class="btn btn-primary" id="login">Login</button>
				</div>
			</div>
		</form>
	</div>
</div>
