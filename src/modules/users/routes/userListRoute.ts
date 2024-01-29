import { createRoute, z } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { ErrorSchema } from "src/common/schema";
import { UserSchema } from "../schemas";

export const userListRoute = createRoute({
	method: "get",
	path: "/",
	tags: ["User"],
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
					schema: UserSchema.omit({ password: true }).array(),
				},
			},
			description: "List all users",
		},
		[StatusCodes.INTERNAL_SERVER_ERROR]: {
			description: "Internal server error",
			content: {
				"application/json": {
					schema: ErrorSchema,
				},
			},
		},
	},
});
