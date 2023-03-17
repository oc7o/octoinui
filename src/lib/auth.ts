import type { RequestEvent } from '@sveltejs/kit';
import { MeQueryStore } from '$houdini';
import { writable } from 'svelte/store';
import { setSession } from '$houdini';

export const authenticateUser = async (event: RequestEvent) => {
	// get the cookies from the request
	const { cookies } = event;

	const accessToken = cookies.get('token');
	const refreshToken = cookies.get('refreshToken');

	setSession(event, { auth: { accessToken, refreshToken } });

	const myQuery = new MeQueryStore();
	const { data } = await myQuery.fetch({ event });

	if (!data?.me) {
		return null;
	} else {
		const user = {
			...data?.me
		};

		return user;
	}
};

export const user: any = writable();
