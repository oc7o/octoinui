<script>
  import { authStore } from "../stores/authStore";
  import { userStore } from "../stores/userStore";
</script>

<div class="navbar bg-gradient-to-r from-lime-500 to-emerald-500">
  <!-- ⬆ text-white -->
  <!-- Navbar Start -->
  <div class="navbar-start">
    <div class="dropdown">
      <span tabindex="0" class="btn btn-ghost btn-circle">
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
      </span>
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
    <button class="btn btn-ghost btn-circle">
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
    </button>
    <!-- Search Button End -->

    <!-- Shopping Cart -->
    <div class="dropdown dropdown-end">
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
      <div
        tabindex="0"
        class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
      >
        <div class="card-body">
          <span class="font-bold text-lg">8 Items</span>
          <span class="text-info">Subtotal: $999</span>
          <div class="card-actions">
            <button class="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Shopping Cart End -->

    {#if $authStore.loggedIn}
      <!-- User Account -->
      <div class="dropdown dropdown-end">
        <span tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="https://placeimg.com/80/80/people" />
          </div>
        </span>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a class="justify-between"> Profile </a>
          </li>
          <li><a>Settings</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      </div>
      <!-- User Account End -->
    {:else}
      <!-- Login Button -->
      <a class="btn btn-accent" href="/login">Login</a>
      <!-- Login Button End -->
    {/if}
  </div>
</div>
