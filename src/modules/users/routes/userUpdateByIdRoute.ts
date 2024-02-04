import { createRoute, z } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { ErrorSchema } from "src/common/schema";

const HeadersSchema = z.object({
	authorization: z.string().openapi({
		example: "Bearer SECRET",
	}),
});

export const userUpdateByIdRoute = createRoute({
	method: "put",
	path: "/:id",
	tags: ["User"],
	security: [
		{
			Bearer: [],
		},
	],
	request: {
		params: z.object({
			id: z.coerce.string().openapi({ description: "User id" }),
		}),
		body: {
			content: {
				"application/json": {
					schema: z.object({}).passthrough(),
				},
			},
		},
		headers: HeadersSchema,
	},
	responses: {
		[StatusCodes.OK]: {
			content: {
				"application/json": {
					schema: z.object({}).passthrough(),
				},
			},
			description: "User updated",
		},
		[StatusCodes.BAD_REQUEST]: {
			description: "Invalid request",
			content: {
				"application/json": {
					schema: ErrorSchema,
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
		[StatusCodes.UNAUTHORIZED]: {
			description: "Unauthorized",
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
