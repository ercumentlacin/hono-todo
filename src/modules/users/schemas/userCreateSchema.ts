import { z } from "@hono/zod-openapi";

export const UserCreateInputSchema = z.object({
	username: z
		.string({ required_error: "Username is required" })
		.min(1, "Username must be at least 1 character long")
		.openapi({
			example: "jondoe",
		}),

	email: z
		.string({
			required_error: "Email is required",
		})
		.email("Email must be a valid email address")
		.openapi({
			example: "This is my user",
		}),

	password: z
		.string({ required_error: "Password is required" })
		.min(3, "Password must be at least 3 characters long")
		.openapi({
			example: "123",
		}),

	todos: z.array(z.string()).optional().default([]).openapi({
		example: [],
	}),
});

export const UserCreateOutputSchema = z.object({
	token: z
		.string({
			required_error: "Token is required",
		})
		.openapi({
			example: "123",
		}),
});

export type UserCreateInput = z.infer<typeof UserCreateInputSchema>;
