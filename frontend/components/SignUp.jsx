import { gql, useMutation } from "@apollo/client";
import React from "react";
import useForm from "../lib/useForm";
import ErrorMessage from "./ErrorMessage";
import FormStyles from "./styles/Form";

const SING_UP_MUTATION = gql`
	mutation signUp($email: String!, $name: String!, $password: String!) {
		createUser(data: { email: $email, name: $name, password: $password }) {
			id
			name
			email
		}
	}
`;

const SignUp = () => {
	const { inputs, handleChange, resetForm } = useForm({
		email: "",
		password: "",
		name: "",
	});
	const [signUp, { loading, data, error }] = useMutation(SING_UP_MUTATION, {
		variables: inputs,
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signUp();
		resetForm();
	};

	return (
		<FormStyles onSubmit={handleSubmit}>
			<h2>Sign Up For an Account</h2>
			<ErrorMessage error={error} />
			<fieldset disabled={loading} aria-busy={loading}>
				{data?.createUser && (
					<p>
						Signed up with {data.createUser.email} - Please go ahead and sign
						in!
					</p>
				)}
				<label htmlFor="name">
					<input
						type="text"
						name="name"
						placeholder="Your name"
						autoComplete="name"
						value={inputs.name}
						onChange={handleChange}
					/>
				</label>

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

				<button type="submit">Sign Up!</button>
			</fieldset>
		</FormStyles>
	);
};

export default SignUp;
