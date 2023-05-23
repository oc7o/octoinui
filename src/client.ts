import { HoudiniClient } from '$houdini';
import { GRAPHQL_ENDPOINT } from '$env/dynamic/private';

export default new HoudiniClient({
	url: GRAPHQL_ENDPOINT, // import.meta.env.GRAPHQL_ENDPOINT, // 'http://localhost:8000/graphql', https://dev.sloow.de/graphql
	fetchParams({ session, text, variables }) {
		return {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: session?.auth?.accessToken ? `JWT ${session?.auth?.accessToken}` : '' // Bearer ?
			},
			body: JSON.stringify({
				query: text,
				variables
			})
		};
	}
});
