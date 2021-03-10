import Link from "next/link";
import React, { Fragment } from "react";
import { useCart } from "../lib/cartState";
import CartCount from "./CartCount";
import Signout from "./Signout";
import NavStyles from "./styles/NavStyles";
import { useUser } from "./User";

const Nav = () => {
	const user = useUser();
	const { openCart } = useCart();

	return (
		<NavStyles>
			<Link href="/products">Products</Link>
			{user && (
				<Fragment>
					<Link href="/sell">Sell</Link>
					<Link href="/orders">Orders</Link>
					<Link href="/account">Account</Link>
					<Signout />
					<button type="button" onClick={openCart}>
						My Cart
						<CartCount
							count={user.cart.reduce(
								(tally, cartItem) =>
									tally + (cartItem.product ? cartItem.quantity : 0),
								0
							)}
						/>
					</button>
				</Fragment>
			)}
			{!user && (
				<Fragment>
					<Link href="/signin">Sign In</Link>
				</Fragment>
			)}
		</NavStyles>
	);
};

export default Nav;
