import { z } from "@hono/zod-openapi";

export const authRefreshTokenInputSchema = z.object({
	token: z
		.string()
		.openapi({ description: "The token of the user", example: "token" }),
});
