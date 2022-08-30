<script context="module" lang="ts">
  import { browser } from "$app/env";
  import { GQL_MeQuery } from "$houdini";
  import type { LoadEvent } from "@sveltejs/kit";
  import { userStore } from "../stores/userStore";
  import { authStore } from "../stores/authStore";
  import { get } from "svelte/store";

  export async function load(event: LoadEvent) {
    await GQL_MeQuery.fetch({ event });
    return {};
  }
</script>

<script>
  $: browser && GQL_MeQuery.fetch();

  if (get(authStore).loggedIn) {
    GQL_MeQuery.fetch();

    const data = $GQL_MeQuery.data;
    if (data?.me === null) {
      // TODO: Here goes refresh token
      authStore.set({
        token: null,
        loggedIn: false,
      });
    } else if (data !== undefined && data !== null) {
      userStore.set({
        ...data.me,
      });
    }
  }
</script>

<slot />
