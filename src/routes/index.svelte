<script>
  import Products from "../components/Products.svelte";
  import Carousel from "../components/Carousel.svelte";
</script>

<div class="flex justify-center my-16">
  <p
    class="box-decoration-clone bg-gradient-to-r from-lime-500 to-emerald-500 text-white text-5xl font-bold px-12 py-3"
  >
    Unsere Top Künstler
  </p>
</div>

<!-- <div class="mx-36 my-12"> -->
<Carousel />
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
