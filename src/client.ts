import { HoudiniClient, type RequestHandler } from '$houdini';
// import { SubscriptonClient} from 'subscriptions-transport-ws';

export default new HoudiniClient({
	url: 'http://localhost:8000/graphql',
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
