import { createRoute } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { ErrorSchema } from "src/common/schema";
import {
	TodoCreateInputSchema,
	TodoCreateOutputSchema,
	TodoOutputSchema,
} from "../schema";

export const todoCreateRoute = createRoute({
	method: "post",
	path: "/",
	request: {
		body: {
			content: {
				"application/json": {
					schema: TodoCreateInputSchema,
				},
			},
		},
	},
	responses: {
		[StatusCodes.CREATED]: {
			content: {
				"application/json": {
					schema: TodoCreateOutputSchema,
				},
			},
			description: "Create a todo",
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
