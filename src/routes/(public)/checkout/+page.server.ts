import { setSession, getSession } from '$houdini';
import { graphql } from '$houdini';
import { redirect, type RequestEvent } from '@sveltejs/kit';
import { addToast } from '$lib/notifications.js';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async (event: RequestEvent) => {
		const form = await event.request.formData();
		const variables = Object.fromEntries(form);

		const createOrder = graphql`
			mutation createOrder(
				$basketWebId: String!
				$firstname: String!
				$lastname: String!
				$city: String!
				$street: String!
				$zipCode: String!
				$email: String!
				$captchaWebId: String!
				$captchaText: String!
			) {
				createOrder(
					basketWebId: $basketWebId
					firstname: $firstname
					lastname: $lastname
					city: $city
					street: $street
					zipCode: $zipCode
					email: $email
					captchaWebId: $captchaWebId
					captchaText: $captchaText
				) {
					firstname
					lastname
					invoice {
						invoiceId
						invoiceUrl
					}
				}
			}
		`;

		const { data, errors } = await createOrder.mutate(variables, { event });
		if (errors) {
			addToast({
				message: 'An error occured. Please try again.',
				type: 'error',
				dismissible: true,
				timeout: 5000
			});
			// throw redirect(303, '/checkout');
		} else {
			throw redirect(303, data.createOrder.invoice.invoiceUrl);
		}
	}
	// captcha: async (event: RequestEvent) => {
	// 	const captcha = graphql`

	// 	`;

	// 	const request = await captcha.mutate({}, event);

	// 	event.cookies.set('captcha_image', request.createCaptcha.image);
	// 	event.cookies.set('captcha_web_id', request.createCaptcha.webId);

	// 	throw redirect(303, '/checkout');
	// }

	// login: async (event: RequestEvent) => {
	// 	const data = await event.request.formData();

	// 	const username = data.get('username');
	// 	const password = data.get('password');

	// 	const tokenAuth = graphql`
	// 		mutation tokenAuth($username: String!, $password: String!) {
	// 			tokenAuth(username: $username, password: $password) {
	// 				token
	// 				refreshToken
	// 				refreshExpiresIn
	// 			}
	// 		}
	// 	`;

	// 	const request = await tokenAuth.mutate({ username, password }, event);

	// 	event.cookies.set('token', request.tokenAuth.token);
	// 	event.cookies.set('refreshToken', request.tokenAuth.refreshToken);

	// 	throw redirect(303, '/');

	// const auth = {
	// 	token: request.tokenAuth.token,
	// 	refreshToken: request.tokenAuth.refreshToken,
	// };
	// setSession(event, { auth });
	// console.log('getSession', getSession(event));
	// }
};
