import { createRoute } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { ErrorSchema } from "src/common/schema";
import { authSignInInputSchema, authSignInOutputSchema } from "../schemas";

export const authSignInRoute = createRoute({
	path: "/sign-in",
	method: "post",
	tags: ["auth"],
	request: {
		body: {
			content: {
				"application/json": {
					schema: authSignInInputSchema,
				},
			},
			description: "The user's login credentials",
		},
	},
	responses: {
		[StatusCodes.UNAUTHORIZED]: {
			description: "Invalid email or password",
			content: {
				"application/json": {
					schema: ErrorSchema,
				},
			},
		},

		[StatusCodes.OK]: {
			description: "The user's login credentials",
			content: {
				"application/json": {
					schema: authSignInOutputSchema,
				},
			},
		},
	},
});
