import { z } from "@hono/zod-openapi";

export const authSignInInputSchema = z.object({
	email: z
		.string({
			required_error: "Email is required",
		})
		.email("Invalid email")
		.openapi({ description: "The email of the user", example: "jon@mail.com" }),

	password: z
		.string({
			required_error: "Password is required",
		})
		.openapi({ description: "The password of the user", example: "password" }),
});
