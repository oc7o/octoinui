import { graphql } from '$houdini';

export const load = async (event) => {
	const afterOrderQuery = graphql`
		query AfterOrder($basketWebId: String!) {
			basket(webId: $basketWebId) {
				order {
					webId
				}
			}
		}
	`;
	const res = await afterOrderQuery.fetch({
		event,
		variables: { basketWebId: event.cookies.get('basket') }
	});

	console.log('delete basket');

	event.cookies.set('basket', '', {
		path: '/',
		maxAge: 0
	});

	return res;
};
