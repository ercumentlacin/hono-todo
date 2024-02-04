import { createRoute } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { ErrorSchema } from "src/common/schema";
import { authSignUpInputSchema, authSignUpOutputSchema } from "../schemas";

export const authSignUpRoute = createRoute({
	path: "/sign-up",
	method: "post",
	tags: ["auth"],
	request: {
		body: {
			content: {
				"application/json": {
					schema: authSignUpInputSchema,
				},
			},
			description: "The user to create",
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

		[StatusCodes.CONFLICT]: {
			description: "Email or username already exists",
			content: {
				"application/json": {
					schema: ErrorSchema,
				},
			},
		},

		[StatusCodes.CREATED]: {
			description: "User created successfully",
			content: {
				"application/json": {
					schema: authSignUpOutputSchema,
				},
			},
		},
	},
});
