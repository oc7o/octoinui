import { setSession, getSession } from '$houdini';
import { graphql } from '$houdini';
import { redirect, type RequestEvent } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
	// default: async (event) => {
	//   // TODO log the user in
	// }
	login: async (event: RequestEvent) => {
		const data = await event.request.formData();

		const username = data.get('username');
		const password = data.get('password');

		const tokenAuth = graphql`
			mutation tokenAuth($username: String!, $password: String!) {
				tokenAuth(username: $username, password: $password) {
					token
					refreshToken
					refreshExpiresIn
				}
			}
		`;

		const request = await tokenAuth.mutate({ username, password }, event);

		event.cookies.set('token', request.tokenAuth.token);
		event.cookies.set('refreshToken', request.tokenAuth.refreshToken);

		throw redirect(303, '/');

		// const auth = {
		// 	token: request.tokenAuth.token,
		// 	refreshToken: request.tokenAuth.refreshToken,
		// };
		// setSession(event, { auth });
		// console.log('getSession', getSession(event));
	},
	logout: async (event: RequestEvent) => {
		event.cookies.delete('token');
		event.cookies.delete('refreshToken');
		event.locals.user = null;

		throw redirect(303, '/');

		// const auth = {
		// 	token: request.tokenAuth.token,
		// 	refreshToken: request.tokenAuth.refreshToken,
		// };
		// setSession(event, { auth });
		// console.log('getSession', getSession(event));
	}
};
