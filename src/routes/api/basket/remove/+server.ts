import { RemoveFromBasketStore } from '$houdini';

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async (event) => {
	const variables = await event.request.json();
	console.log('variables', variables);

	const basketQuery = new RemoveFromBasketStore();

	const { data } = await basketQuery.mutate(
		{ webId: variables.webId, productInventorySku: variables.sku },
		event
	);
	const data_json = json(data);

	return data_json;
}) satisfies RequestHandler;

// export const POST = (async (event) => {
// 	const variables = await event.request.json();

// 	const inventoriesQuery = new productInventoriesBySkusStore();
// 	const { data } = await inventoriesQuery.fetch({ event, variables });

// 	return json(data);
// }) satisfies RequestHandler;
