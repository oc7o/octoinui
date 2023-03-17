/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
	schemaPath: './schema.graphql',
	sourceGlob: 'src/**/*.{svelte,gql,graphql}',
	apiUrl: 'http://localhost:8000/graphql',
	plugins: {
		'houdini-svelte': {}
	},
	scalars: {
		/* in your case, something like */
		Decimal: {
			type: 'number',
			// turn the api's response into that type
			unmarshal(val) {
				return new Number(val);
			},
			// turn the value into something the API can use
			marshal(decimal) {
				return decimal.toString();
			}
		},
		JSON: {
			type: 'JSON',
			// turn the api's response into that type
			unmarshal(val) {
				return new JSON(val);
			},
			// turn the value into something the API can use
			marshal(json) {
				return json.toJSON();
			}
		},
		DateTime: {
			// the corresponding typescript type
			type: 'Date',
			// turn the api's response into that type
			unmarshal(val) {
				return new Date(val);
			},
			// turn the value into something the API can use
			marshal(date) {
				return date.getTime();
			}
		}
	}
};

export default config;
