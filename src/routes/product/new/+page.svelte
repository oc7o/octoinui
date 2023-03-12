<div class="flex justify-center">
	<div class="card w-4/6 mt-16 bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Create Product</h2>
			<div class="form-control w-full max-w-xs">
				<label class="label">
					<span class="label-text">Name</span>
				</label>
				<input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
			</div>
			<div class="form-control">
				<label class="label">
					<span class="label-text">Description</span>
				</label>
				<textarea class="textarea textarea-bordered h-24" placeholder="Bio" />
			</div>
			<div class="form-control w-full max-w-xs">
				<label class="label">
					<span class="label-text">Category</span>
				</label>
				<select class="select select-bordered">
					<option disabled selected>Pick one</option>
					<option>Star Wars</option>
					<option>Harry Potter</option>
					<option>Lord of the Rings</option>
					<option>Planet of the Apes</option>
					<option>Star Trek</option>
				</select>
			</div>
			<div class="card-actions justify-end">
				<button class="btn btn-primary">Create</button>
			</div>
		</div>
	</div>
</div>
