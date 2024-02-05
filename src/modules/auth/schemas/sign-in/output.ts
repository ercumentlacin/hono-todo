import { z } from "@hono/zod-openapi";

export const authSignInOutputSchema = z.object({
	accessToken: z.string().openapi({
		description: "The user's access token",
	}),

	refreshToken: z.string().openapi({
		description: "The user's refresh token",
	}),
});
