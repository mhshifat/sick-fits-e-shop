import { gql, useMutation } from "@apollo/client";
import React from "react";
import useForm from "../lib/useForm";
import ErrorMessage from "./ErrorMessage";
import FormStyles from "./styles/Form";

const RESET_MUTATION = gql`
	mutation requestReset(
		$email: String!
		$token: String!
		$password: Password!
	) {
		redeemUserPasswordResetToken(
			email: $email
			token: $token
			password: $password
		) {
			code
			message
		}
	}
`;

const Reset = ({ token }) => {
	const { inputs, handleChange, resetForm } = useForm({
		email: "",
		password: "",
		token,
	});
	const [resetPassword, { loading, data, error }] = useMutation(
		RESET_MUTATION,
		{
			variables: inputs,
		}
	);

	const successfullError = data?.redeemUserPasswordResetToken.code
		? data?.redeemUserPasswordResetToken
		: undefined;
	const handleSubmit = async (e) => {
		e.preventDefault();
		await resetPassword();
		resetForm();
	};

	return (
		<FormStyles onSubmit={handleSubmit}>
			<h2>Reset Your Password</h2>
			<ErrorMessage error={error || successfullError} />
			<fieldset disabled={loading} aria-busy={loading}>
				{data?.redeemUserPasswordResetToken === null && (
					<p>Success! You can now sign in!</p>
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

				<label htmlFor="password">
					<input
						type="password"
						name="password"
						placeholder="Password"
						autoComplete="password"
						value={inputs.password}
						onChange={handleChange}
					/>
				</label>

				<button type="submit">Request Reset!</button>
			</fieldset>
		</FormStyles>
	);
};

export default Reset;
