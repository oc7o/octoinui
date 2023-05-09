import { graphql } from '$houdini';

export const _houdini_load = graphql`
	query Account {
		me {
			balance
			email
		}
	}
`;
