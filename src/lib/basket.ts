import type { RequestEvent } from '@sveltejs/kit';
import { GetBasketQueryStore, CreateBasketMutationStore } from '$houdini';
import { writable } from 'svelte/store';

export const fetchBasket = async (event: RequestEvent) => {
	let basket = event.cookies.get('basket') || null;

	if (!basket) {
		const createBasket = new CreateBasketMutationStore();

		const response = await createBasket.mutate({}, { event });

		basket = {
			...response?.data?.createBasket
		};
		event.cookies.set('basket', basket.webId, {
			path: '/'
		});
		return basket;
	} else {
		const getBasket = new GetBasketQueryStore();
		const { data, errors } = await getBasket.fetch({ event, variables: { webId: basket } });
		if (errors) {
			const createBasket = new CreateBasketMutationStore();

			const response = await createBasket.mutate({}, { event });

			basket = {
				...response?.data?.createBasket
			};
			event.cookies.set('basket', basket.webId, {
				path: '/'
			});
			return basket;
		}

		basket = {
			...data?.basket
		};
		return basket;
	}
};

export const basket: any = writable();
