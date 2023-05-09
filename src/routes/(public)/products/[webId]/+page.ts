import { graphql } from '$houdini';

export const _houdini_load = graphql`
	query ProductDetail($webId: String!) {
		productByWebId(webId: $webId) {
			webId
			name
			slug
			description
			isActive
			createdAt
			updatedAt
			owner {
				username
			}
			defaultImage {
				image
			}
			category {
				name
				slug
			}
			inventories {
				webId
				attributes
				storePrice
				brand {
					name
				}
				productImages {
					image
				}
			}
		}
	}
`;

export const _ProductDetailVariables = (event) => {
	return {
		webId: event.params.webId
	};
};
