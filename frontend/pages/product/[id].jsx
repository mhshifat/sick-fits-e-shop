import { useRouter } from "next/router";
import React from "react";
import SingleProduct from "../../components/SingleProduct";

const ProductPage = () => {
	const { query } = useRouter();

	return <SingleProduct id={query.id} />;
};

export default ProductPage;
