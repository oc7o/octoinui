<script context="module" lang="ts">
    import { browser } from "$app/env";
    import { GQL_TestQuery } from "$houdini";
    import type { LoadEvent } from "@sveltejs/kit";
  
    export async function load(event: LoadEvent) {
      await GQL_TestQuery.fetch({ event });
      return {};
    }
  </script>
  
  <script>
    import Products from "../lib/components/Products.svelte";
    import Carousel from "../lib/components/Carousel.svelte";
  
    import { userStore } from "../lib/stores/userStore";
  
    $: browser && GQL_TestQuery.fetch();
  </script>
  
  <!-- {$GQL_TestQuery.data?.systemStatus.system} -->
  {JSON.stringify($userStore)}
  
  <div class="flex justify-center my-16">
    <p
      class="box-decoration-clone bg-gradient-to-r from-lime-500 to-emerald-500 text-white text-5xl font-bold px-12 py-3"
    >
      Unsere Top Verkäufer des Monats
    </p>
  </div>
  
  <!-- <div class="mx-36 my-12"> -->
  <!-- <Carousel /> -->
  <!-- </div> -->
  
  <div class="flex justify-center my-16">
    <p
      class="box-decoration-clone bg-gradient-to-r from-lime-500 to-emerald-500 text-white text-5xl font-bold px-12 py-3"
    >
      Die innovativsten Produkte
    </p>
  </div>
  
  <div class="">
    <Products />
  </div>
  <br />
  