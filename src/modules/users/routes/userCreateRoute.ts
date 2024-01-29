import { createRoute } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { ErrorSchema } from "src/common/schema";
import { UserCreateInputSchema, UserCreateOutputSchema } from "../schemas";

export const userCreateRoute = createRoute({
	method: "post",
	path: "/",
	tags: ["User"],
	request: {
		body: {
			content: {
				"application/json": {
					schema: UserCreateInputSchema,
				},
			},
		},
	},
	responses: {
		[StatusCodes.CREATED]: {
			content: {
				"application/json": {
					schema: UserCreateOutputSchema,
				},
			},
			description: "Create a todo",
		},
		[StatusCodes.CONFLICT]: {
			description: "User already exists",
			content: {
				"application/json": {
					schema: ErrorSchema,
				},
			},
		},
		[StatusCodes.BAD_REQUEST]: {
			description: "Invalid input",
			content: {
				"application/json": {
					schema: ErrorSchema,
				},
			},
		},
	},
});
