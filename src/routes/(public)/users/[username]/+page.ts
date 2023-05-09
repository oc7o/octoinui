import { graphql } from '$houdini';

export const _houdini_load = graphql`
	query UserDetail($username: String!, $offset: Int, $limit: Int) {
		user(username: $username) {
			username
			profileImage
		}
		products(user: $username, offset: $offset, limit: $limit, search: null) {
			items {
				webId
				name
				description
				startingFromPrice
				defaultImage {
					image
				}
			}
			totalItemsCount
		}
	}
`;

export const _UserDetailVariables = ({ params, url }) => {
	return {
		username: params.username,
		offset: Number(url.searchParams.get('offset')) || 0,
		limit: 12
	};
};
