import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import ErrorMessage from "../../components/ErrorMessage";
import OrderStyles from "../../components/styles/OrderStyles";
import formatMoney from "../../lib/formatMoney";

const SINGLE_ORDER_QUERY = gql`
	query order($id: ID!) {
		order: Order(where: { id: $id }) {
			id
			charge
			total
			user {
				id
			}
			items {
				id
				name
				description
				price
				quantity
				photo {
					image {
						publicUrlTransformed
					}
				}
			}
		}
	}
`;

export default function OrderPage(props) {
	const { query } = useRouter();
	const { data, loading, error } = useQuery(SINGLE_ORDER_QUERY, {
		variables: { id: query.id },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <ErrorMessage error={error} />;
	return (
		<OrderStyles>
			<Head>
				<title>Sick Fits - {data.order.id}</title>
			</Head>
			<p>
				<span>Order Id:</span>
				<span>{data.order.id}</span>
			</p>
			<p>
				<span>Charge:</span>
				<span>{data.order.charge}</span>
			</p>
			<p>
				<span>Order Total:</span>
				<span>{formatMoney(data.order.total)}</span>
			</p>
			<p>
				<span>Item Count:</span>
				<span>{data.order.items.length}</span>
			</p>
			<div className="items">
				{data.order.items.map((item) => (
					<div key={item.id} className="order-item">
						<img src={item.photo.image.publicUrlTransformed} alt={item.title} />
						<div className="item-details">
							<h2>{item.name}</h2>
							<p>Qty: {item.quantity}</p>
							<p>Each: {formatMoney(item.price)}</p>
							<p>Sub Total: {formatMoney(item.price * item.quantity)}</p>
							<p>{item.description}</p>
						</div>
					</div>
				))}
			</div>
		</OrderStyles>
	);
}
