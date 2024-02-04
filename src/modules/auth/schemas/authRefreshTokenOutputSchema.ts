import { z } from "@hono/zod-openapi";

export const authRefreshTokenOutputSchema = z.object({
	accessToken: z
		.string()
		.openapi({ description: "The access token of the user", example: "token" }),
});
