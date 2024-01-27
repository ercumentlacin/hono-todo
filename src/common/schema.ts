import { z } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";

export const ErrorSchema = z.object({
	code: z.number().default(StatusCodes.BAD_REQUEST).openapi({
		example: StatusCodes.BAD_REQUEST,
	}),
	message: z.string().openapi({
		example: "Bad Request",
	}),
	success: z.boolean().default(false).openapi({
		example: false,
	}),
});
