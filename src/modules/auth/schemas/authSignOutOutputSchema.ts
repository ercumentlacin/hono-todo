import { z } from "@hono/zod-openapi";

export const authSignOutOutputSchema = z.object({
	success: z.boolean().default(true).openapi({
		description: "The refreshToken of the user",
		example: true,
	}),

	message: z.string().openapi({
		description: "The refreshToken of the user",
		example: "User signed out successfully",
	}),
});
