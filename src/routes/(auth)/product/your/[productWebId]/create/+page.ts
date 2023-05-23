import { graphql } from '$houdini';

export const _houdini_load = graphql`
	query CreateProductInventory($productWebId: String!) {
		productByWebId(webId: $productWebId) {
			name
			webId
		}
		productTypes {
			name
			webId
		}
	}
`;

// export const _CreateProductInventoryVariables = ({ url, params }) => {
// 	return {
// 		webId: params.webId
// 	};
// };
