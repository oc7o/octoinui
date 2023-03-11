import { createOrderStore } from '$houdini';

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async (event) => {
	const variables = await event.request.json();
	console.log('variables', variables);

	const createOrder = new createOrderStore();
	const r = await createOrder.mutate(variables, event);

	return json(r);
}) satisfies RequestHandler;
