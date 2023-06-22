import { graphql } from '$houdini';

export const _houdini_load = graphql`
	query YourOrders {
		myOrders {
			firstname
			lastname
			email
			street
			city
			zipCode
			status
			createdAt
			totalPrice
			invoice {
				invoiceId
			}
			basket {
				vendorBasketObjects {
					productInventory {
						webId
						product {
							name
							owner {
								username
							}
						}
					}
				}
			}
		}
	}
`;
