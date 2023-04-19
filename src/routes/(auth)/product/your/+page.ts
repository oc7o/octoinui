import { graphql } from '$houdini';

export const _houdini_load = graphql`
	query YourProducts($offset: Int!) {
		meProducts(offset: $offset, limit: 12) {
			items {
				webId
				name
				isActive
				description
				startingFromPrice
				defaultImage {
					imgUrl
				}
			}
			totalItemsCount
		}
	}
`;

export const _YourProductsVariables = ({ url }) => {
	return {
		offset: Number(url.searchParams.get('offset')) || 0
	};
};
