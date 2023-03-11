import { HoudiniClient, type RequestHandler } from '$houdini';
// import { SubscriptonClient} from 'subscriptions-transport-ws';
import { browser } from '$app/environment';
import { getSession } from '$houdini';

const requestHandler: RequestHandler = async ({ fetch, text = '', variables = {}, session }) => {
	const url = 'http://localhost:8000/graphql';
	const result = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: session?.auth?.token ? `JWT ${session?.auth?.token}` : '' // Bearer ?
		},
		body: JSON.stringify({
			query: text,
			variables
		})
	});

	return await result.json();
};

export default new HoudiniClient(requestHandler);
