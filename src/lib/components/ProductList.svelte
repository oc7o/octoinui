<script lang="ts">
	import { graphql } from '$houdini';

	$: limit = 12;
	$: offset = 0;
	let search: string | null = null;

	export const _ProductListQueryVariables = ({}) => {
		return { user: props?.user ? props.user : null, offset, limit, search };
	};

	// $: productListQuery = graphql(`
	// 	query ProductsQuery($user: String = null, $offset: Int, $limit: Int, $search: String = null) {
	// 		products(user: $user, offset: $offset, limit: $limit, search: $search) @paginate {
	// 			items {
	// 				webId
	// 				name
	// 				defaultImage {
	// 					imgUrl
	// 				}
	// 			}
	// 			totalItemsCount
	// 		}
	// 	}
	// `);
</script>
