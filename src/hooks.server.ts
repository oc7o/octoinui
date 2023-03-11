import { setSession, getSession } from '$houdini';
import { fetchUser } from '$lib/user';

/* @type { import('@sveltejs/kit').Handle } */
export const handle = async ({ event, resolve }) => {
	// get the user information however you want

	const auth = {
		token: event.cookies.get('token'),
		refreshToken: event.cookies.get('refreshToken')
	};

	// set the session information for this event
	setSession(event, { auth });

	// pass the event onto the default handle
	return await resolve(event);
};
