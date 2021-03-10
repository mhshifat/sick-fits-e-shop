import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";
import useForm from "../lib/useForm";
import ErrorMessage from "./ErrorMessage";
import { PRODUCT_QUERY } from "./SingleProduct";
import FormStyles from "./styles/Form";

const UPDATE_PRODUCT_MUTATION = gql`
	mutation UpdateProduct(
		$id: ID!
		$name: String
		$description: String
		$price: Int
	) {
		updateProduct(
			id: $id
			data: { name: $name, description: $description, price: $price }
		) {
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

const UpdateProduct = ({ id }) => {
	const router = useRouter();
	const { data, loading, error } = useQuery(PRODUCT_QUERY, {
		variables: { id },
	});
	const { inputs, handleChange, clearForm } = useForm(data?.Product);
	const [
		updateProduct,
		{ data: updateData, error: updateError, loading: updateLoading },
	] = useMutation(UPDATE_PRODUCT_MUTATION, {
		variables: {
			id,
			name: inputs.name,
			description: inputs.description,
			price: inputs.price,
		},
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await updateProduct();
		clearForm();
		router.push(`/product/${res.data.updateProduct.id}`);
	};

	if (loading) return <p>Loading...</p>;
	return (
		<FormStyles onSubmit={handleSubmit}>
			<ErrorMessage error={error || updateError} />
			<fieldset disabled={updateLoading} aria-busy={updateLoading}>
				<label htmlFor="name">
					Name
					<input
						type="text"
						id="name"
						name="name"
						placeholder="Name"
						value={inputs.name}
						onChange={handleChange}
					/>
				</label>

				<label htmlFor="price">
					Price
					<input
						type="number"
						id="price"
						name="price"
						placeholder="Price"
						value={inputs.price}
						onChange={handleChange}
					/>
				</label>

				<label htmlFor="description">
					Description
					<textarea
						id="description"
						name="description"
						placeholder="Description"
						value={inputs.description}
						onChange={handleChange}
					/>
				</label>

				<button type="submit">Update Product</button>
			</fieldset>
		</FormStyles>
	);
};

export default UpdateProduct;
