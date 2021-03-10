import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import React from "react";
import styled from "styled-components";
import ErrorMessage from "./ErrorMessage";

export const PRODUCT_QUERY = gql`
	query ProductQuery($id: ID!) {
		Product(where: { id: $id }) {
			id
			name
			description
			status
			price
			photo {
				id
				image {
					publicUrlTransformed
				}
			}
		}
	}
`;

const ProductStyles = styled.div`
	display: grid;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	max-width: var(--maxWidth);
	justify-content: center;
	align-items: top;
	gap: 2rem;

	img {
		width: 100%;
		object-fit: contain;
	}
`;

const SingleProduct = ({ id }) => {
	const { data, loading, error } = useQuery(PRODUCT_QUERY, {
		variables: { id },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <ErrorMessage error={error} />;
	return (
		<ProductStyles>
			<Head>
				<title>{data.Product.name}</title>
			</Head>
			<img
				src={data.Product.photo.image.publicUrlTransformed}
				alt={data.Product.name}
			/>
			<div className="details">
				<h2>{data.Product.name}</h2>
				<p>{data.Product.description}</p>
			</div>
		</ProductStyles>
	);
};

export default SingleProduct;
