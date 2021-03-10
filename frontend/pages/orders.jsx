import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import ErrorMessage from "../components/ErrorMessage";
import OrderItemStyles from "../components/styles/OrderItemStyles";
import formatMoney from "../lib/formatMoney";

const USER_ORDERS_QUERY = gql`
	query allOrders {
		allOrders {
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

const OrderUl = styled.ul`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	grid-gap: 4rem;
`;

const countItemsInAnOrder = (order) => {
	return order.items.reduce((tally, item) => tally + item.quantity, 0);
};

export default function OrdersPage() {
	const { data, loading, error } = useQuery(USER_ORDERS_QUERY);

	if (loading) return <p>Loading...</p>;
	if (error) return <ErrorMessage error={error} />;
	return (
		<div>
			<Head>
				<title>Your orders ({data.allOrders.length})</title>
			</Head>
			<h2>You have {data.allOrders.length}</h2>
			<OrderUl>
				{data.allOrders.map((order) => (
					<OrderItemStyles key={order.id}>
						<Link href={`/order/${order.id}`}>
							<a>
								<div className="order-meta">
									<p>{countItemsInAnOrder(order)} Items</p>
									<p>
										{order.items.length} Product
										{order.items.length === 1 ? "" : "s"}
									</p>
									<p>{formatMoney(order.total)}</p>
								</div>
								<div className="images">
									{order.items.map((item) => (
										<img
											key={item.id}
											src={item?.photo?.image?.publicUrlTransformed}
											alt={item.name}
										/>
									))}
								</div>
							</a>
						</Link>
					</OrderItemStyles>
				))}
			</OrderUl>
		</div>
	);
}
