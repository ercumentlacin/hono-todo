import { createRoute, z } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { ErrorSchema } from "src/common/schema";
import { UserSchema } from "../schemas";

const HeadersSchema = z.object({
	// Header keys must be in lowercase, `Authorization` is not allowed.
	authorization: z.string().openapi({
		example: "Bearer SECRET",
	}),
});

const authTokenSchema = z.object({
	authorization: z
		.string({
			required_error: "Authorization header is required",
		})
		.refine((value) => value.startsWith("Bearer "), {
			message: "Invalid Authorization header",
		})
		.openapi({
			description:
				"Include a Bearer token in the 'Authorization' header. For example: 'Bearer YOUR_TOKEN_HERE'",
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
			id: z.string().openapi({ description: "User id" }),
		}),
		body: {
			content: {
				"application/json": {
					schema: UserSchema,
				},
			},
		},
		headers: HeadersSchema,
	},
	responses: {
		[StatusCodes.OK]: {
			content: {
				"application/json": {
					schema: UserSchema.omit({ password: true }),
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
