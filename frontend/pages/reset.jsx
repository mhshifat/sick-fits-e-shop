import { useRouter } from "next/router";
import React from "react";
import RequestReset from "../components/RequestReset";
import Reset from "../components/Reset";

const ResetPage = () => {
	const { query } = useRouter();

	if (!query?.token)
		return (
			<div>
				<p>Sorry! You must supply a token</p>
				<RequestReset />
			</div>
		);
	return (
		<div>
			<p>Reset your password</p>
			<Reset token={query.token} />
		</div>
	);
};

export default ResetPage;
