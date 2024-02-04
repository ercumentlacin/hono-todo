import { createRoute } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { ErrorSchema } from "src/common/schema";
import { authSignOutInputSchema, authSignOutOutputSchema } from "../schemas";

export const authSignOutRoute = createRoute({
	path: "/sign-out",
	method: "post",
	tags: ["auth"],
	request: {
		body: {
			content: {
				"application/json": {
					schema: authSignOutInputSchema,
				},
			},
			description: "The user to create",
		},
	},
	responses: {
		[StatusCodes.BAD_REQUEST]: {
			description: "Refresh token is required",
			content: {
				"application/json": {
					schema: ErrorSchema,
				},
			},
		},

		[StatusCodes.OK]: {
			description: "User signed out successfully",
			content: {
				"application/json": {
					schema: authSignOutOutputSchema,
				},
			},
		},
	},
});
