import { createRoute, z } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { ErrorSchema } from "src/common/schema";
import { todoByIdOutputSchema, todoUpdateByIdInputSchema } from "../schemas";

export const todoUpdateByIdRoute = createRoute({
	method: "put",
	path: "/:id",
	tags: ["Todos"],
	description: "Update todo by id",
	request: {
		params: z.object({
			id: z.coerce.string().openapi({ description: "Todo id", example: "1" }),
		}),
		body: {
			content: {
				"application/json": {
					schema: todoUpdateByIdInputSchema,
				},
			},
		},
	},
	responses: {
		[StatusCodes.OK]: {
			content: {
				"application/json": {
					schema: todoByIdOutputSchema,
				},
			},
			description: "Get todo by id",
		},
		[StatusCodes.NOT_FOUND]: {
			description: "Invalid input",
			content: {
				"application/json": {
					schema: ErrorSchema,
				},
			},
		},
		[StatusCodes.INTERNAL_SERVER_ERROR]: {
			description: "Invalid input",
			content: {
				"application/json": {
					schema: ErrorSchema,
				},
			},
		},
	},
});
