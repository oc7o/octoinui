import { graphql } from '$houdini';

export const _houdini_load = graphql`
	query CheckOrder($webId: String!) {
		checkOrder(webId: $webId) {
			status
			firstname
			lastname
			zipCode
			city
			street
		}
	}
`;

export const _CheckOrderVariables = ({ props, url }) => {
	return { webId: url.searchParams.get('code') };
};
