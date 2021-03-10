import { useRouter } from "next/router";
import React from "react";
import UpdateProduct from "../components/UpdateProduct";

const Update = () => {
	const { query } = useRouter();

	return (
		<div>
			<UpdateProduct id={query.id} />
		</div>
	);
};

export default Update;
