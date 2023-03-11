<script>
	import { graphql } from '$houdini';

	const store = graphql(`
		query top20UsersQuery {
			top20Users {
				username
				isSuperuser
				isStaff
				profileImage
			}
		}
	`);
</script>

<!-- {JSON.stringify($store.data?.top20Users)} -->

<!-- {#if $store.data?.top20Users && $store.data?.top20Users.length != 0}
	<div class="carousel carousel-center rounded-box">
		{#each $store.data?.top20Users as user}
			<div class="carousel-item h-full w-48">
				<a href="/users/">
					<img src={user.profileImage} alt="Pizza" />
				</a>
			</div>
		{/each}
	</div>
{/if} -->

{#if $store.data?.top20Users && $store.data?.top20Users.length != 0}
	<div class="carousel carousel-center rounded-box">
		{#each $store.data?.top20Users as user}
			<div class="carousel-item mx-4 card bg-base-100 shadow-xl w-96 h-[32rem]">
				<figure>
					<img src={user.profileImage} class="w-full h-96 object-cover object-top" />
				</figure>
				<div class="stats stats-vertical lg:stats-horizontal">
					<div class="stat">
						<div class="stat-title">Sold this month</div>
						<div class="stat-value">31K</div>
						<div class="stat-desc">All time:</div>
					</div>

					<div class="stat">
						<div class="stat-title">{user.username}</div>
						<div class="stat-value">
							<a href={`/users/${user.username}`} class="btn btn-primary">View</a>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}

<!-- <div
  id="carouselExampleCaptions"
  class="carousel slide relative"
  data-bs-ride="carousel"
>
  <div
    class="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4"
  >
    <button
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide-to="0"
      class="active"
      aria-current="true"
      aria-label="Slide 1"
    />
    <button
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide-to="1"
      aria-label="Slide 2"
    />
    <button
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide-to="2"
      aria-label="Slide 3"
    />
  </div>
  <div class="carousel-inner relative w-full overflow-hidden">
    <div class="carousel-item active relative float-left w-full">
      <img
        src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg"
        class="block w-full"
        alt="..."
      />
      <div class="carousel-caption hidden md:block absolute text-center">
        <h5 class="text-xl">Hier könntest du stehen!</h5>
        <p>Deine Kunst ist safe der Hammer 😁</p>
      </div>
    </div>
    <div class="carousel-item relative float-left w-full">
      <img
        src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg"
        class="block w-full"
        alt="..."
      />
      <div class="carousel-caption hidden md:block absolute text-center">
        <h5 class="text-xl">Hier könntest du stehen!</h5>
        <p>Du kriegst Cash 💸</p>
      </div>
    </div>
    <div class="carousel-item relative float-left w-full">
      <img
        src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg"
        class="block w-full"
        alt="..."
      />
      <div class="carousel-caption hidden md:block absolute text-center">
        <h5 class="text-xl">Hier könntest du stehen!</h5>
        <p>Wir bieten die Platform 🏝</p>
      </div>
    </div>
  </div>
  <button
    class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
    type="button"
    data-bs-target="#carouselExampleCaptions"
    data-bs-slide="prev"
  >
    <span
      class="carousel-control-prev-icon inline-block bg-no-repeat"
      aria-hidden="true"
    />
    <span class="visually-hidden">Previous</span>
  </button>
  <button
    class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
    type="button"
    data-bs-target="#carouselExampleCaptions"
    data-bs-slide="next"
  >
    <span
      class="carousel-control-next-icon inline-block bg-no-repeat"
      aria-hidden="true"
    />
    <span class="visually-hidden">Next</span>
  </button>
</div> -->
