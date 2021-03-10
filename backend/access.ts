/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { permissionsList } from "./schemas/fields";
import { ListAccessArgs } from "./types";

export const isSignedIn = ({ session }: ListAccessArgs): boolean => !!session;

// @ts-ignore
const generatedPermissions = Object.fromEntries(
	permissionsList.map((per) => [
		per,
		({ session }: ListAccessArgs) => !!session?.data?.role?.[per],
	])
);

export const permissions = {
	...generatedPermissions,
};

export const rules = {
	canManageProducts({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) return false;
		if (permissions.canManageProducts({ session })) return true;
		return { user: { id: session.itemId } };
	},
	canOrder({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) return false;
		if (permissions.canManageCart({ session })) return true;
		return { user: { id: session.itemId } };
	},
	canManageUsers({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) return false;
		if (permissions.canManageUsers({ session })) return true;
		return { id: session.itemId };
	},
	canManageOrderItems({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) return false;
		if (permissions.canManageCart({ session })) return true;
		return { order: { user: { id: session.itemId } } };
	},
	canReadProducts({ session }: ListAccessArgs) {
		if (!isSignedIn({ session })) return false;
		if (permissions.canManageProducts({ session })) return true;
		return { status: "AVAILABLE" };
	},
};
