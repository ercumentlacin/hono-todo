import { createRoute, z } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { ErrorSchema } from "src/common/schema";
import { UserSchema } from "../schemas";

export const userRoute = createRoute({
	method: "get",
	path: "/:id",
	tags: ["User"],
	summary: "Get user by id",
	request: {
		params: z.object({
			id: z.coerce.string().openapi({
				example: "1",
			}),
		}),
	},
	responses: {
		[StatusCodes.OK]: {
			description: "User found",
			content: {
				"application/json": {
					schema: UserSchema.omit({ password: true }),
				},
			},
		},
		[StatusCodes.NOT_FOUND]: {
			description: "User not found",
			content: {
				"application/json": {
					schema: ErrorSchema,
				},
			},
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
