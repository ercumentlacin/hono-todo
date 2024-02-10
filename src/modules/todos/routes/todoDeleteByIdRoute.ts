import { createRoute, z } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { ErrorSchema } from "src/common/schema";

export const todoDeleteByIdRoute = createRoute({
	method: "delete",
	path: "/:id",
	tags: ["Todos"],
	description: "Delete todo by id",
	request: {
		params: z.object({
			id: z.coerce.string().openapi({ description: "Todo id", example: "1" }),
		}),
	},
	responses: {
		[StatusCodes.OK]: {
			content: {
				"application/json": {
					schema: z
						.object({ success: z.literal(true) })
						.openapi({ description: "Success", example: { success: true } }),
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
