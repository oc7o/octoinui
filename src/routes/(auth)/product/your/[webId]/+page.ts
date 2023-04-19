import { graphql } from '$houdini';

export const _houdini_load = graphql`
	query YourProductInventories($webId: String!) {
		productByWebId(webId: $webId) {
			name
			description
			isActive
			category {
				name
				slug
			}
			webId
			product {
				sku
				storePrice
				productImages {
					imgUrl
				}
			}
		}
		categories {
			name
			slug
		}
	}
`;

// export const _YourProductsVariables = ({ url }) => {
// 	return {
// 		offset: Number(url.searchParams.get('offset')) || 0
// 	};
// };
