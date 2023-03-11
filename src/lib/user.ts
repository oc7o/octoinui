import { graphql, MeQueryStore } from '$houdini';
import type { RequestEvent } from '@sveltejs/kit';
import { userStore } from '$lib/stores';

export async function fetchUser(event: RequestEvent) {
	const meQuery = new MeQueryStore();

	const { data } = await meQuery.fetch({ event });

	userStore.set(data!.me);
}
