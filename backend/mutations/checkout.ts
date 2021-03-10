/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { KeystoneContext } from "@keystone-next/types";
import { OrderCreateInput } from "../.keystone/schema-types";
import stripeConfig from "../lib/stripe";

export default async function checkout(
	_: unknown,
	{ token }: { token: string },
	ctx: KeystoneContext
): Promise<OrderCreateInput> {
	const userId = ctx.session.itemId;
	if (!userId)
		throw new Error("Sorry! you must be signed in to create an order!");
	const user = await ctx.lists.User.findOne({
		where: { id: userId },
		resolveFields: String.raw`id
      name
      email
      cart {
        id
        quantity
        product {
          name
          price
          description
          id
          photo {
            id
            image {
              id
              publicUrlTransformed
            }
          }
        }
      }
    `,
	});
	const cartItems = user.cart.filter((cartItem) => cartItem.product);
	const amount = cartItems.reduce(
		(tally, cartItem) => tally + cartItem.quantity + cartItem.product.price,
		0
	);
	const charge = await stripeConfig.paymentIntents
		.create({
			amount,
			currency: "USD",
			confirm: true,
			payment_method: token,
		})
		.catch((err) => {
			console.error(err);
			throw new Error(err.message);
		});
	const orderItems = cartItems.map((cartItem) => ({
		name: cartItem.product.name,
		description: cartItem.product.description,
		price: cartItem.product.price,
		quantity: cartItem.quantity,
		photo: { connect: { id: cartItem.product.photo.id } },
	}));
	const order = await ctx.lists.Order.createOne({
		data: {
			total: charge.amount,
			charge: charge.id,
			items: { create: orderItems },
			user: { connect: { id: userId } },
		},
	});
	const cartItemIds = user.cart.map((cartItem) => cartItem.id);
	await ctx.lists.CartItem.deleteMany({
		ids: cartItemIds,
	});
	return order;
}
