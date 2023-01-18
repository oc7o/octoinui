// const GRAPHQL_API = import.meta.env.VITE_GRAPHQL_API;

/** @type {import('houdini').ConfigFile} */
const config = {
  schemaPath: "./schema.graphql",
  sourceGlob: "src/**/*.{svelte,gql,graphql}",
  // client: "./src/client",
  apiUrl: "http://localhost:8000/graphql",
};

export default config;
