<script>
  import { GQL_createOrder } from "$houdini";
  import { cartStore, addToCart } from "$lib/stores/cartStore";
  import { get } from "svelte/store";
  import { browser } from "$app/env";

  const variables = { cart: get(cartStore).items };

  if (browser) {
    GQL_createOrder.mutate({ variables });
  }

  //   const data = $GQL_createOrder.data;

  // if (data?.tokenAuth?.token) {
  //   authStore.set({
  //     token: data?.tokenAuth?.token,
  //     loggedIn: true,
  //   });
  // }
</script>

<h1>Checkout</h1>

{#if $GQL_createOrder.isFetching || !$GQL_createOrder.data}
  <p>Loading...</p>
{:else}
  {JSON.stringify($GQL_createOrder.data.createOrder)}
{/if}
