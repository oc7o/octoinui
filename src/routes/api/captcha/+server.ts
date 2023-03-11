import { createCaptchaStore } from '$houdini';

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async (event) => {
	const captcha = new createCaptchaStore();
	const r = await captcha.mutate({}, event);
	return json(r);
}) satisfies RequestHandler;
