// import { graphql } from '$houdini';
// import { redirect, type RequestEvent } from '@sveltejs/kit';
// import { addToast } from '$lib/notifications';

// export const actions = {
// 	default: async (event: RequestEvent) => {
// 		const data = await event.request.formData();

// 		const product = data.get('product');
// 		const storePrice = data.get('storePrice');
// 		const productType = data.get('productType');
// 		const media_files = data.getAll('media');
// 		const attributeValues = data.get('attribute_values');

// 		console.log('media_files', media_files);

// 		let media = [];
// 		for (let media_file in media_files) {
// 			media.push({ img_url: media_file });
// 		}

// 		console.log('media', media);

// 		// const name = data.get('name');
// 		// const description = data.get('description');
// 		// const category = data.get('category');

// 		const createProductInventory = graphql`
// 			mutation CreateProductInventoryMutation(
// 				$product: String!
// 				$productType: String
// 				$storePrice: Decimal!
// 				$media: [MediaInputType!]
// 				$attributeValues: JSON
// 			) {
// 				createProductInventory(
// 					product: $product
// 					storePrice: $storePrice
// 					productType: $productType
// 					media: $media
// 					attributeValues: $attributeValues
// 				) {
// 					sku
// 				}
// 			}
// 		`;

// 		const r = await createProductInventory.mutate(
// 			{ product, storePrice, productType, media, attributeValues },
// 			{ event }
// 		);

// 		console.log('r', r);

// 		addToast({
// 			message: 'Successfully created product!',
// 			type: 'success',
// 			dismissible: true,
// 			timeout: 10000
// 		});

// 		throw redirect(303, `/product/your/${event.params.webId}`);

// 		// const auth = {
// 		// 	token: request.tokenAuth.token,
// 		// 	refreshToken: request.tokenAuth.refreshToken,
// 		// };
// 		// setSession(event, { auth });
// 		// console.log('getSession', getSession(event));
// 	}
// };
