
import { HoudiniClient, type RequestHandlerArgs } from '$houdini';
import { authStore } from "./lib/stores/authStore";
import { get } from 'svelte/store'

async function fetchQuery({
	fetch,
	text = '',
	variables = {},
	session,
	metadata
}: RequestHandlerArgs) {	
	const token = get(authStore).token;
	variables.token = token;
	
	
	const url = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:8000/graphql';
	const result = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: token ? `JWT ${token}` : ''
		},
		body: JSON.stringify({
			query: text,
			variables
		})
	});
	
	return await result.json();
}

export default new HoudiniClient(fetchQuery);
