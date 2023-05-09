import { graphql } from '$houdini';

export const _houdini_load = graphql`
	query YourProductInventories($productWebId: String!) {
		productByWebId(webId: $productWebId) {
			name
			description
			isActive
			category {
				name
				slug
			}
			webId
			inventories {
				webId
				storePrice
				productImages {
					image
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
