// import { productInventoriesBySkusStore } from '$houdini';
import type { LoadEvent } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { browser } from '$app/environment';

export const load = async (event: LoadEvent) => {
	const response = await event.fetch('/api/captcha', {
		method: 'POST',
		body: JSON.stringify({})
	});
	const captcha = await response.json();

	return captcha;
};
