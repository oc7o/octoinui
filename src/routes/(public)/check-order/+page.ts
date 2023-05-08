import { graphql } from '$houdini';

export const _houdini_load = graphql`
	query CheckOrder($code: String!) {
		checkOrder(code: $code) {
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
	console.log(url.searchParams.get('code'));

	return { code: url.searchParams.get('code') };
};
