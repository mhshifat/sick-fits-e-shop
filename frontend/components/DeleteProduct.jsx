import { gql, useMutation } from "@apollo/client";
import React from "react";

const DELETE_PRODUCT_MUTATION = gql`
	mutation DeleteProduct($id: ID!) {
		deleteProduct(id: $id) {
			id
			name
			description
			price
		}
	}
`;

const DeleteProduct = ({ id, children }) => {
	const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
		variables: { id },
		update: (cache, payload) => {
			cache.evict(cache.identify(payload.data.deleteProduct));
		},
	});

	const deleteProductFn = async () => {
		if (confirm("Are you sure you want to delete this item?")) {
			await deleteProduct();
		}
	};

	return (
		<button disabled={loading} type="button" onClick={deleteProductFn}>
			{children}
		</button>
	);
};

export default DeleteProduct;
