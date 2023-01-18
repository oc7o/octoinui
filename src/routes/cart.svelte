<script lang="ts">
  import { browser } from "$app/env";
  import { GQL_productInventoriesBySkus } from "$houdini";
  import { cartStore, addToCart } from "$lib/stores/cartStore";
  import { get } from "svelte/store";

  const variables = { skus: Object.keys(get(cartStore).items) };

  $: browser && GQL_productInventoriesBySkus.fetch({ variables });

  const addItemToCart = (sku: string) => {
    addToCart(sku);
  };
</script>

<div class="flex justify-center my-16">
  <p
    class="box-decoration-clone bg-gradient-to-r from-lime-500 to-emerald-500 text-white text-5xl font-bold px-12 py-3"
  >
    Your Cart
  </p>
</div>

{#if !$GQL_productInventoriesBySkus.isFetching && $GQL_productInventoriesBySkus.data && $GQL_productInventoriesBySkus.data?.productInventoriesBySkus?.length}
  {#if $GQL_productInventoriesBySkus.data.productInventoriesBySkus.length === 0}
    <div class="flex justify-center my-16">
      <p class="text-5xl font-bold">Your cart is empty</p>
    </div>
  {:else}
    <div class="overflow-x-auto w-full">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
            </th>
            <th>Item</th>
            <th>Amount</th>
            <th>Price</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <!-- row -->
          {#each $GQL_productInventoriesBySkus.data?.productInventoriesBySkus as inventory}
            <tr>
              <th>
                <label>
                  <input type="checkbox" class="checkbox" />
                </label>
              </th>
              <td>
                <div class="flex items-center space-x-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img
                        src={inventory.product.defaultImage?.imgUrl}
                        alt="Item"
                      />
                      <!-- change src to correct img -->
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{inventory.product.name}</div>
                    <div class="text-sm opacity-50">{inventory.sku}</div>
                  </div>
                </div>
              </td>
              <td>
                {$cartStore.items[inventory.sku]}
              </td>
              <td>[Price Placeholder]</td>
              <th>
                <a
                  class="btn btn-ghost btn-xs"
                  href={`/products/${inventory.product.webId}#${inventory.sku}`}
                  >details</a
                >
              </th>
            </tr>
          {/each}
        </tbody>
        <!-- foot -->
        <tfoot>
          <tr>
            <th>Total</th>
            <th />
            <th>...</th>
            <th>...</th>
            <th />
          </tr>
        </tfoot>
      </table>
    </div>
  {/if}
{/if}
<a class="btn btn-primary" href="/checkout">Check Out</a>
