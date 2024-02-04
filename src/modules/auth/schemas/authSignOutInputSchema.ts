import { z } from "@hono/zod-openapi";

export const authSignOutInputSchema = z.object({
	refreshToken: z.string().openapi({
		description: "The refreshToken of the user",
		example: "refreshToken",
	}),
});
