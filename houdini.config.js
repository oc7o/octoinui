/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
	schemaPath: './schema.graphql',
	sourceGlob: 'src/**/*.{svelte,gql,graphql}',
	apiUrl: 'http://localhost:8000/graphql',
	plugins: {
		'houdini-svelte': {}
	}
};

export default config;
