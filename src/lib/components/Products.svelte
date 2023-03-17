<script lang="ts">
	import { paginatedFragment, graphql } from '$houdini';
	import { ProductsFragment } from '$houdini';

	$: paginatedFragment<ProductsFragment>();
</script>
