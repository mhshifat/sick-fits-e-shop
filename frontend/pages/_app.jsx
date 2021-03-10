import { ApolloProvider } from "@apollo/client";
import router from "next/router";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import Page from "../components/Page";
import "../components/styles/nprogress.css";
import { CartStateProvider } from "../lib/cartState";
import withData from "../lib/withData";

router.events.on("routeChangeStart", () => nprogress.start());
router.events.on("routeChangeComplete", () => nprogress.done());
router.events.on("routeChangeError", () => nprogress.done());

function MyApp({ Component, pageProps, apollo }) {
	return (
		<ApolloProvider client={apollo}>
			<CartStateProvider>
				<Page>
					<Component {...pageProps} />
				</Page>
			</CartStateProvider>
		</ApolloProvider>
	);
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
	let pageProps = {};
	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}
	pageProps.query = ctx.query;
	return pageProps;
};

export default withData(MyApp);
