<script lang="ts">
	import { graphql } from '$houdini';
	import { browser } from '$app/environment';

	export let webId: string;
	export let sku: string | null;

	/* @type { import('./$houdini').MyComponentQueryVariables } */
	export const _SingleProductQueryVariables = ({ props }) => {
		return { webId };
	};

	// console.log('webId ' + webId);

	// console.log('sku: ' + sku);

	const productQuery = graphql(`
		query SingleProductQuery($webId: String!) {
			productByWebId(webId: $webId) {
				webId
				name
				slug
				description
				isActive
				createdAt
				updatedAt
				owner {
					username
				}
				defaultImage {
					imgUrl
				}
				category {
					name
					slug
				}
				product {
					sku
					attributes
					storePrice
					brand {
						name
					}
					productImages {
						imgUrl
					}
				}
			}
		}
	`); // @load
	$: inventory =
		sku != null
			? $productQuery.data?.productByWebId?.product?.find((i) => i.sku == sku)
			: $productQuery.data?.productByWebId?.product?.[0];

	const addOneItemToBasket = graphql(`
		mutation addOneItemToBasket($webId: String!, $productInventorySku: String!) {
			addToBasket(webId: $webId, productInventorySku: $productInventorySku, quantity: 1) {
				webId
			}
		}
	`);

	const addItemToCart = async (productInventorySku: string) => {
		if (browser) {
			let cartWebId;

			if (localStorage.getItem('cart')) {
				cartWebId = localStorage.getItem('cart') as string;
			} else {
				const r = await fetch('/api/basket/create');
				const c = await r.json();
				cartWebId = c.createBasket.webId;
				localStorage.setItem('cart', JSON.stringify(cartWebId).replace(/['"]+/g, ''));
			}
			await addOneItemToBasket.mutate({ webId: cartWebId, productInventorySku });
		}
	};
</script>

<!-- {JSON.stringify($productQuery.data)} -->

{#if $productQuery !== null && $productQuery.data?.productByWebId?.product != undefined}
	<!-- {JSON.stringify(inventory)} -->

	<div id={`#${inventory.sku}`} class="card mx-96 my-8">
		<div class="card__title">
			<div class="icon">
				<a href="/"><i class="fa fa-arrow-left" /></a>
			</div>
			{#each $productQuery.data?.productByWebId?.category as category}
				&nbsp;<span class="badge badge-primary badge-lg">{category.name}</span>
			{/each}
		</div>
		<div class="card__body">
			<div class="half">
				<div class="featured_text">
					<h1>{$productQuery.data?.productByWebId?.name}</h1>
					<p class="sub">{inventory?.brand?.name}</p>
					<p class="price">{inventory?.storePrice}€</p>
				</div>
				<div class="carousel carousel-center rounded-box">
					{#each inventory.productImages as image}
						<div class="image carousel-item">
							<img class="rounded-xl w-full" src={image.imgUrl} alt="" />
						</div>
					{/each}
				</div>
			</div>
			<div class="half">
				<div class="description">
					<p>
						{$productQuery.data?.productByWebId?.description}
					</p>
				</div>
				<table class="table-auto">
					<tbody>
						{#each Object.keys(inventory.attributes) as attribute}
							<tr>
								<td class="px-4 py-2">{attribute}</td>
								<td class="px-4 py-2">{inventory.attributes[attribute]}</td>
							</tr>
						{/each}
					</tbody>
				</table>
				<span class="stock"><i class="fa fa-pen" /> In stock</span>
				<div class="reviews">
					<ul class="stars">
						<li><i class="fa fa-star" /></li>
						<li><i class="fa fa-star" /></li>
						<li><i class="fa fa-star" /></li>
						<li><i class="fa fa-star" /></li>
						<li><i class="fa fa-star-o" /></li>
					</ul>
					<!-- <span>(64 reviews)</span> -->
				</div>
			</div>
		</div>
		<div class="card__footer">
			<div class="recommend">
				<p>Inserted by</p>
				<!-- <h3>{$productQuery.data?.productByWebId?.owner.username}</h3> -->
			</div>
			<div class="action">
				<button
					type="button"
					on:click={() => {
						addItemToCart(inventory.sku);
					}}>Add to cart</button
				>
			</div>
		</div>
		<div class="flex justify-center py-2 gap-2">
			{#each $productQuery.data?.productByWebId?.product as inventory, i}
				<a href={`/products/${webId}/${inventory.sku}`} class="btn btn-xs">{i}</a>
			{/each}
		</div>
	</div>
{/if}

<style>
	@import url('https://fonts.googleapis.com/css?family=Fjalla+One|Montserrat:300,400,700,800|Open+Sans:300');
	@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css');

	body {
		background-image: linear-gradient(to right bottom, #b91eda, #a02ae0, #8234e5, #5d3be8, #1241eb);
		height: 100%;
		margin: 0;
		background-repeat: no-repeat;
		background-attachment: fixed;
	}

	main {
		max-width: 720px;
		margin: 5% auto;
	}

	.card {
		box-shadow: 0 6px 6px rgba(0, 0, 0, 0.3);
		transition: 200ms;
		background: #fff;
	}
	.card .card__title {
		display: flex;
		align-items: center;
		padding: 30px 40px;
	}
	.card .card__title h3 {
		flex: 0 1 200px;
		text-align: right;
		margin: 0;
		color: #252525;
		font-family: sans-serif;
		font-weight: 600;
		font-size: 20px;
		text-transform: uppercase;
	}
	.card .card__title .icon {
		flex: 1 0 10px;
		background: #115dd8;
		color: #fff;
		padding: 10px 10px;
		transition: 200ms;
	}
	.card .card__title .icon > a {
		color: #fff;
	}
	.card .card__title .icon:hover {
		background: #252525;
	}
	.card .card__body {
		padding: 0 40px;
		display: flex;
		flex-flow: row no-wrap;
		margin-bottom: 25px;
	}
	.card .card__body > .half {
		box-sizing: border-box;
		padding: 0 15px;
		flex: 1 0 50%;
	}
	.card .card__body .featured_text h1 {
		margin: 0;
		padding: 0;
		font-weight: 800;
		font-family: 'Montserrat', sans-serif;
		font-size: 64px;
		line-height: 50px;
		color: #181e28;
	}
	.card .card__body .featured_text p {
		margin: 0;
		padding: 0;
	}
	.card .card__body .featured_text p.sub {
		font-family: 'Montserrat', sans-serif;
		font-size: 26px;
		text-transform: uppercase;
		color: #686e77;
		font-weight: 300;
		margin-bottom: 5px;
	}
	.card .card__body .featured_text p.price {
		font-family: 'Fjalla One', sans-serif;
		color: #252525;
		font-size: 26px;
	}
	.card .card__body .image {
		padding-top: 15px;
		width: 100%;
	}
	.card .card__body .image img {
		display: block;
		max-width: 100%;
		height: auto;
	}
	.card .card__body .description {
		margin-bottom: 25px;
	}
	.card .card__body .description p {
		margin: 0;
		font-family: 'Open Sans', sans-serif;
		font-weight: 300;
		line-height: 27px;
		font-size: 16px;
		color: #555;
	}
	.card .card__body span.stock {
		font-family: 'Montserrat', sans-serif;
		font-weight: 600;
		color: #a1cc16;
	}
	.card .card__body .reviews .stars {
		display: inline-block;
		list-style: none;
		padding: 0;
	}
	.card .card__body .reviews .stars > li {
		display: inline-block;
	}
	.card .card__body .reviews .stars > li .fa {
		color: #f7c01b;
	}
	.card .card__body .reviews > span {
		font-family: 'Open Sans', sans-serif;
		font-size: 14px;
		margin-left: 5px;
		color: #555;
	}
	.card .card__footer {
		padding: 30px 40px;
		display: flex;
		flex-flow: row no-wrap;
		align-items: center;
		position: relative;
	}
	.card .card__footer::before {
		content: '';
		position: absolute;
		display: block;
		top: 0;
		left: 40px;
		width: calc(100% - 40px);
		height: 3px;
		background: #115dd8;
		background: linear-gradient(to right, #115dd8 0%, #115dd8 20%, #ddd 20%, #ddd 100%);
	}
	.card .card__footer .recommend {
		flex: 1 0 10px;
	}
	.card .card__footer .recommend p {
		margin: 0;
		font-family: 'Montserrat', sans-serif;
		text-transform: uppercase;
		font-weight: 600;
		font-size: 14px;
		color: #555;
	}
	.card .card__footer .recommend h3 {
		margin: 0;
		font-size: 20px;
		font-family: 'Montserrat', sans-serif;
		font-weight: 600;
		text-transform: uppercase;
		color: #115dd8;
	}
	.card .card__footer .action button {
		cursor: pointer;
		border: 1px solid #115dd8;
		padding: 14px 30px;
		border-radius: 200px;
		color: #fff;
		background: #115dd8;
		font-family: 'Open Sans', sans-serif;
		font-size: 16px;
		transition: 200ms;
	}
	.card .card__footer .action button:hover {
		background: #fff;
		color: #115dd8;
	}
</style>
