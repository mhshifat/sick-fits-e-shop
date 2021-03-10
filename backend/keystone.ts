import { createAuth } from "@keystone-next/auth";
import { config, createSchema } from "@keystone-next/keystone/schema";
import {
	statelessSessions,
	withItemData,
} from "@keystone-next/keystone/session";
import "dotenv/config";
import { sendPasswordResetEmail } from "./lib/mail";
import { extendGraphqlSchema } from "./mutations/index";
import { CartItem } from "./schemas/CartItem";
import { permissionsList } from "./schemas/fields";
import { Order } from "./schemas/Order";
import { OrderItem } from "./schemas/OrderItem";
import { Product } from "./schemas/Product";
import { ProductImage } from "./schemas/ProductImage";
import { Role } from "./schemas/Role";
import { User } from "./schemas/User";
import { insertSeedData } from "./seed-data";

const databaseUrl = process.env.DATABASE_URL || "";

const sessionConfig = {
	maxAge: 60 * 60 * 24 * 360,
	secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
	listKey: "User",
	identityField: "email",
	secretField: "password",
	initFirstItem: {
		fields: ["name", "email", "password"],
	},
	passwordResetLink: {
		sendToken: async (args) => {
			await sendPasswordResetEmail(args.token, args.identity);
		},
	},
});

export default withAuth(
	config({
		server: {
			cors: {
				origin: [process.env.FRONTEND_URL],
				credentials: true,
			},
		},
		db: {
			adapter: "mongoose",
			url: databaseUrl,
			onConnect: async (keystone) => {
				if (process.argv.includes("--seed-data")) {
					await insertSeedData(keystone);
				}
			},
		},
		lists: createSchema({
			User,
			Product,
			ProductImage,
			CartItem,
			OrderItem,
			Order,
			Role,
		}),
		extendGraphqlSchema,
		ui: {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			isAccessAllowed: ({ session }) => !!session?.data,
		},
		session: withItemData(statelessSessions(sessionConfig), {
			User: `id name email role { ${permissionsList.join(" ")} }`,
		}),
	})
);
