import { HoudiniClient } from '$houdini';

export default new HoudiniClient({
	url: 'https://dev.sloow.de/graphql', // import.meta.env.GRAPHQL_ENDPOINT, // 'http://localhost:8000/graphql',
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
