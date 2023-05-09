export const load = async function ({ data }) {
	return {
		user: data.user,
		basket: data.basket
	};
};
