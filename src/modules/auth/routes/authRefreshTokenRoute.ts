import { createRoute } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { ErrorSchema } from "src/common/schema";
import {
	authRefreshTokenInputSchema,
	authRefreshTokenOutputSchema,
} from "../schemas";

export const authRefreshTokenRoute = createRoute({
	path: "/refresh-token",
	method: "post",
	tags: ["auth"],
	request: {
		body: {
			content: {
				"application/json": {
					schema: authRefreshTokenInputSchema,
				},
			},
			description: "The user to create",
		},
	},
	responses: {
		[StatusCodes.BAD_REQUEST]: {
			description: "Refresh token is required",
			content: {
				"application/json": {
					schema: ErrorSchema,
				},
			},
		},

		[StatusCodes.UNAUTHORIZED]: {
			description: "Invalid refresh token",
			content: {
				"application/json": {
					schema: ErrorSchema,
				},
			},
		},

		[StatusCodes.OK]: {
			description: "Refresh token created successfully",
			content: {
				"application/json": {
					schema: authRefreshTokenOutputSchema,
				},
			},
		},
	},
});
