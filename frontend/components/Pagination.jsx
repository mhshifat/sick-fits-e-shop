import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { perPage } from "../config";
import ErrorMessage from "./ErrorMessage";
import PaginationStyles from "./styles/PaginationStyles";

export const PAGINATION_QUERY = gql`
	query AllProductsMeta {
		_allProductsMeta {
			count
		}
	}
`;

const Pagination = ({ page }) => {
	const { data, loading, error } = useQuery(PAGINATION_QUERY);

	const pageCount = Math.ceil(data?._allProductsMeta.count / perPage);

	if (loading) return <p>Loading...</p>;
	if (error) return <ErrorMessage error={error} />;
	return (
		<PaginationStyles>
			<Head>
				<title>
					Sick Fits - Page {page} of {pageCount}
				</title>
			</Head>
			<Link href={`/products/${page - 1}`}>
				<a aria-disabled={page <= 1}>← Prev</a>
			</Link>
			<p>
				Page {page} of {pageCount}
			</p>
			<p>{data._allProductsMeta.count} Items Total</p>
			<Link href={`/products/${page + 1}`}>
				<a aria-disabled={page >= pageCount}>Next →</a>
			</Link>
		</PaginationStyles>
	);
};

export default Pagination;
