import type { RequestEvent } from '@sveltejs/kit';
import { MeQueryStore } from '$houdini';
import { writable } from 'svelte/store';
import { setSession, graphql } from '$houdini';

export const authenticateUser = async (event: RequestEvent) => {
	// get the cookies from the request
	const { cookies } = event;

	const accessToken = cookies.get('token');
	const refreshToken = cookies.get('refreshToken');

	setSession(event, { auth: { accessToken, refreshToken } });

	const myQuery = new MeQueryStore();
	const res1 = await myQuery.fetch({ event });

	if (!res1.data?.me) {
		if (refreshToken != null && refreshToken != '') {
			const refreshMutation: any = graphql`
				mutation newAccessTokenFromRefreshToken($refreshToken: String) {
					refreshToken(refreshToken: $refreshToken) {
						token
					}
				}
			`;
			const res2 = await refreshMutation.mutate({ refreshToken }, { event });

			if (res2.errors) {
				cookies.delete('token');
				cookies.delete('refreshToken');
				return null;
			}
			if (res2.data && res2.data.refreshToken && res2.data.refreshToken.token) {
				cookies.set('token', res2.data.refreshToken.token);

				setSession(event, { auth: { accessToken: res2.data.refreshToken.token, refreshToken } });
				const myQuery = new MeQueryStore();
				const res3 = await myQuery.fetch({ event });

				if (res3.data?.me) {
					return res3.data.me;
				}
			}
		}

		return null;
	} else {
		const user = {
			...res1.data?.me
		};

		return user;
	}
};

export const user: any = writable();
