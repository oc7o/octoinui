<script>
  import { authStore } from "../lib/stores/authStore";
  import { goto } from "$app/navigation";

  authStore.set({
    token: null,
    loggedIn: false,
  });

  goto("/");
</script>
