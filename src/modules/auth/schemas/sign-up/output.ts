import { z } from "@hono/zod-openapi";

export const authSignUpOutputSchema = z.object({
	id: z.number(),
	email: z.string(),
	username: z.string(),
	createdAt: z.coerce.string(),
	updatedAt: z.coerce.string(),
});
