import { gql, useMutation } from "@apollo/client";
import React from "react";
import useForm from "../lib/useForm";
import ErrorMessage from "./ErrorMessage";
import FormStyles from "./styles/Form";
import { CURRENT_USER_QUERY } from "./User";

const SING_IN_MUTATION = gql`
	mutation signIn($email: String!, $password: String!) {
		authenticateUserWithPassword(email: $email, password: $password) {
			... on UserAuthenticationWithPasswordSuccess {
				item {
					id
					name
					email
				}
			}
			... on UserAuthenticationWithPasswordFailure {
				message
			}
		}
	}
`;

const SignIn = () => {
	const { inputs, handleChange, resetForm } = useForm({
		email: "",
		password: "",
	});
	const [signin, { loading, data }] = useMutation(SING_IN_MUTATION, {
		variables: inputs,
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});

	const error =
		data?.authenticateUserWithPassword?.__typename ===
		"UserAuthenticationWithPasswordFailure"
			? data?.authenticateUserWithPassword
			: undefined;
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(inputs);
		await signin();
		resetForm();
	};

	return (
		<FormStyles onSubmit={handleSubmit}>
			<h2>Sign Into Your Account</h2>
			<ErrorMessage error={error} />
			<fieldset disabled={loading} aria-busy={loading}>
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

				<button type="submit">Sign In!</button>
			</fieldset>
		</FormStyles>
	);
};

export default SignIn;
