<script lang="ts">
  import { authStore } from "../lib/stores/authStore";
  import { GQL_tokenAuth } from "$houdini";

  var username = "";
  var password = "";

  const login = async () => {
    await GQL_tokenAuth.mutate({
      variables: {
        username,
        password,
      },
    });
    const data = $GQL_tokenAuth.data;
    if (data?.tokenAuth?.obtainPayload?.token) {
      authStore.set({
        token: data?.tokenAuth?.obtainPayload?.token,
        loggedIn: true,
      });
    }
  };
</script>

<div class="flex justify-center my-24">
  <div class="card w-96 bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Username</span>
        </label>
        <input
          bind:value={username}
          type="text"
          placeholder="Username"
          class="input input-bordered w-full max-w-xs"
        />
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <input
          bind:value={password}
          type="password"
          placeholder="Password"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
      <div class="card-actions justify-center">
        <button class="btn btn-primary" id="login" on:click={login}
          >Button</button
        >
      </div>
    </div>
  </div>
</div>

<div class="bg-white">
  <pre>
        {JSON.stringify($GQL_tokenAuth, null, 2)}
      </pre>
</div>
