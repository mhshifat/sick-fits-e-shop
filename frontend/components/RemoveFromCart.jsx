import { gql, useMutation } from "@apollo/client";
import React from "react";
import styled from "styled-components";

const BigButton = styled.button`
	font-size: 3rem;
	background: none;
	border: 0;
	&:hover {
		color: var(--red);
		cursor: pointer;
	}
`;

const REMOVE_CART_ITEM_MUTATION = gql`
	mutation removeCartItem($id: ID!) {
		deleteCartItem(id: $id) {
			id
		}
	}
`;

function update(cache, payload) {
	cache.evict(cache.identify(payload.data.deleteCartItem));
}

const RemoveFromCart = ({ id }) => {
	const [deleteCartItem, { loading }] = useMutation(REMOVE_CART_ITEM_MUTATION, {
		variables: { id },
		update,
	});

	return (
		<BigButton
			onClick={deleteCartItem}
			disabled={loading}
			title="Remove this item from cart"
		>
			&times;
		</BigButton>
	);
};

export default RemoveFromCart;
