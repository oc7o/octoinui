// import { productInventoriesBySkusStore } from '$houdini';
import type { LoadEvent } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { browser } from '$app/environment';
import { graphql } from '$houdini';

export const load = async (event: LoadEvent) => {
	const createCaptcha = graphql`
		mutation createCaptcha {
			createCaptcha {
				image
				webId
			}
		}
	`;
	const { data } = await createCaptcha.mutate({}, { event });

	return data;
};
