// import { productInventoriesBySkusStore } from '$houdini';
import type { PageLoad } from './$types';
import { get } from 'svelte/store';
import { browser } from '$app/environment';

export const load = (async ({ fetch }) => {
	if (!browser) {
		return {};
	}

	let cartWebId;

	if (localStorage.getItem('cart')) {
		cartWebId = localStorage.getItem('cart') as string;
	} else {
		const r = await fetch('/api/basket/create');
		const c = await r.json();
		cartWebId = c.createBasket.webId;
		localStorage.setItem('cart', JSON.stringify(cartWebId).replace(/['"]+/g, ''));
	}

	const response = await fetch('/api/basket', { method: 'POST', body: JSON.stringify(cartWebId) });

	const cart = await response.json();
	console.log('cart', cart);

	return cart;
}) satisfies PageLoad;
