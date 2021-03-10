import { gql, useMutation } from "@apollo/client";
import React from "react";
import { CURRENT_USER_QUERY } from "./User";

const ADD_TO_CART_MUTATION = gql`
	mutation addToCart($id: ID!) {
		addToCart(productId: $id) {
			id
		}
	}
`;

const AddToCart = ({ id }) => {
	const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
		variables: { id },
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});

	return (
		<>
			<button type="button" disabled={loading} onClick={addToCart}>
				Add{loading && "ing"} To Cart 🛒
			</button>
		</>
	);
};

export default AddToCart;
