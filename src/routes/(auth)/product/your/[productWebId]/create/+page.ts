import { graphql } from '$houdini';

export const _houdini_load = graphql`
	query CreateProductInventory($webId: String!) {
		productByWebId(webId: $webId) {
			name
			webId
		}
		productTypes {
			name
		}
	}
`;

// export const _CreateProductInventoryVariables = ({ url, params }) => {
// 	return {
// 		webId: params.webId
// 	};
// };
