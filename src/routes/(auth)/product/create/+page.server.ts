import { graphql } from '$houdini';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import { addToast } from '$lib/notifications';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event: RequestEvent) => {
		const data = await event.request.formData();

		const name = data.get('name');
		const description = data.get('description');
		const category = data.get('category');

		console.log('name', name);
		console.log('description', description);
		console.log('category', category);

		const createProduct = graphql(`
			mutation CreateProduct($name: String!, $description: String!, $category: String!) {
				createProduct(name: $name, description: $description, category: $category) {
					name
					webId
					category {
						name
					}
				}
			}
		`);
		console.log('createProduct', createProduct);

		await createProduct.mutate({ name, description, category }, { event });

		addToast({
			message: 'Successfully created product!',
			type: 'success',
			dismissible: true,
			timeout: 10000
		});

		throw redirect(303, '/product/your');

		// const auth = {
		// 	token: request.tokenAuth.token,
		// 	refreshToken: request.tokenAuth.refreshToken,
		// };
		// setSession(event, { auth });
		// console.log('getSession', getSession(event));
	}
};
