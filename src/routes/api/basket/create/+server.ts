import { createBasketStore } from '$houdini';

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async (event) => {
	const basket = new createBasketStore();
	const r = await basket.mutate({}, event);
	return json(r);
}) satisfies RequestHandler;
