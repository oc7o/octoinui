import { graphql } from '$houdini';

export const _houdini_load = graphql`
	query Home($user: String = null, $offset: Int, $limit: Int, $search: String = null) {
		products(user: $user, offset: $offset, limit: $limit, search: $search) {
			items {
				webId
				name
				description
				startingFromPrice
				defaultImage {
					imgUrl
				}
			}
			totalItemsCount
		}
		top20Users {
			username
			isSuperuser
			isStaff
			profileImage
			amountEarnedThisMonth
		}
	}
`;

export const _HomeVariables = ({ url }) => {
	return {
		offset: Number(url.searchParams.get('offset')) || 0,
		limit: 12,
		search: url.searchParams.get('search') || null
	};
};
