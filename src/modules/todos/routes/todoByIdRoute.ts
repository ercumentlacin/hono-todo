import { createRoute, z } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { ErrorSchema } from "src/common/schema";
import { todoByIdOutputSchema } from "../schemas";

export const todoByIdRoute = createRoute({
	method: "get",
	path: "/:id",
	tags: ["Todos"],
	request: {
		params: z.object({
			id: z.coerce.string().openapi({ description: "Todo id", example: "1" }),
		}),
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
