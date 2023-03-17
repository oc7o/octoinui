import type { RequestEvent } from '@sveltejs/kit';
import { GetBasketQueryStore, CreateBasketMutationStore } from '$houdini';
import { writable } from 'svelte/store';

export const fetchBasket = async (event: RequestEvent) => {
	let basket = event.locals.basket;

	if (!basket) {
		const createBasket = new CreateBasketMutationStore();

		const response = await createBasket.mutate({}, { event });

		basket = {
			...response?.data?.createBasket
		};

		return basket;
	} else {
		const getBasket = new GetBasketQueryStore();
		const { data } = await getBasket.fetch({ event, variables: { webId: basket.webId } });

		basket = {
			...data?.basket
		};
		return basket;
	}
};

export const basket: any = writable();
