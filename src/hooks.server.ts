import { authenticateUser } from '$lib/auth';
import { fetchBasket } from '$lib/basket';

/* @type { import('@sveltejs/kit').Handle } */
export const handle = async ({ event, resolve }) => {
	event.locals.user = await authenticateUser(event);
	event.locals.basket = await fetchBasket(event);

	// pass the event onto the default handle
	return await resolve(event);
};
