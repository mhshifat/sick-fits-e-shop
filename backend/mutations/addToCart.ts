/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { KeystoneContext } from "@keystone-next/types";
import { CartItemCreateInput } from "../.keystone/schema-types";
import { Session } from "../types";

export default async function addToCart(
	_: unknown,
	{ productId }: { productId: string },
	ctx: KeystoneContext
): Promise<CartItemCreateInput> {
	const session = ctx.session as Session;
	if (!session.itemId) throw new Error("You must be log in to do this!");
	const allItem = await ctx.lists.CartItem.findMany({
		where: { user: { id: session.itemId }, product: { id: productId } },
		resolveFields: "id,quantity",
	});
	const [existingCartItem] = allItem;
	if (existingCartItem) {
		return ctx.lists.CartItem.updateOne({
			id: existingCartItem.id,
			data: { quantity: existingCartItem.quantity + 1 },
		}) as CartItemCreateInput;
	}
	return ctx.lists.CartItem.createOne({
		data: {
			product: { connect: { id: productId } },
			user: { connect: { id: session.itemId } },
		},
	}) as CartItemCreateInput;
}
