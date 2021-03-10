import { gql, useMutation } from "@apollo/client";
import React from "react";
import useForm from "../lib/useForm";
import ErrorMessage from "./ErrorMessage";
import FormStyles from "./styles/Form";

const REQUEST_RESET_MUTATION = gql`
	mutation requestReset($email: String!) {
		sendUserPasswordResetLink(email: $email) {
			code
		}
	}
`;

const RequestReset = () => {
	const { inputs, handleChange, resetForm } = useForm({
		email: "",
	});
	const [signUp, { loading, data, error }] = useMutation(
		REQUEST_RESET_MUTATION,
		{
			variables: inputs,
		}
	);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signUp();
		resetForm();
	};

	return (
		<FormStyles onSubmit={handleSubmit}>
			<h2>Request a Password Reset</h2>
			<ErrorMessage error={error} />
			<fieldset disabled={loading} aria-busy={loading}>
				{data?.sendUserPasswordResetLink === null && (
					<p>Success! Check your email for a link!</p>
				)}

				<label htmlFor="email">
					<input
						type="email"
						name="email"
						placeholder="Your email address"
						autoComplete="email"
						value={inputs.email}
						onChange={handleChange}
					/>
				</label>

				<button type="submit">Request Reset!</button>
			</fieldset>
		</FormStyles>
	);
};

export default RequestReset;
