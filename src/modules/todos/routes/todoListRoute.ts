import { createRoute, z } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { ErrorSchema } from "src/common/schema";
import { TodosOutputSchema } from "../schemas";

export const todoListRoute = createRoute({
	method: "get",
	path: "/",
	tags: ["Todos"],
	request: {
		query: z.object({
			limit: z.coerce.string().default("2").openapi({
				example: "2",
			}),
			skip: z.coerce.string().default("0").openapi({
				example: "0",
			}),
		}),
	},
	responses: {
		[StatusCodes.OK]: {
			content: {
				"application/json": {
					schema: TodosOutputSchema,
				},
			},
			description: "Create a todo",
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
