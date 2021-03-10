import { gql, useMutation } from "@apollo/client";
import React from "react";
import { CURRENT_USER_QUERY } from "./User";

const SIGNOUT_MUTATION = gql`
	mutation {
		endSession
	}
`;

const Signout = () => {
	const [signOut] = useMutation(SIGNOUT_MUTATION, {
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});

	return (
		<button type="button" onClick={signOut}>
			Sign Out
		</button>
	);
};

export default Signout;
