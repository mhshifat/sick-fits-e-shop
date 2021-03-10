import { gql, useQuery } from "@apollo/client";

export const CURRENT_USER_QUERY = gql`
	query CurrentUserQuery {
		authenticatedItem {
			... on User {
				id
				name
				email
				cart {
					id
					quantity
					product {
						id
						name
						price
						description
						photo {
							image {
								publicUrlTransformed
							}
						}
					}
				}
			}
		}
	}
`;

export const useUser = () => {
	const { data } = useQuery(CURRENT_USER_QUERY);

	return data?.authenticatedItem;
};
