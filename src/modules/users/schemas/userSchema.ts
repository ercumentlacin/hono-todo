import { z } from "@hono/zod-openapi";

export const UserSchema = z.object({
	id: z.number(),
	email: z
		.string({
			required_error: "Email is required",
		})
		.email("Invalid email")
		.openapi({
			example: "jon@mail.com",
		}),
	username: z
		.string({
			required_error: "Username is required",
		})
		.openapi({
			example: "user",
		}),
	password: z
		.string({
			required_error: "Password is required",
		})
		.openapi({
			example: "password",
		}),
	createdAt: z.string().default(Date.now().toString()),
	updatedAt: z.string().default(Date.now().toString()),
	todos: z.array(z.unknown()),
});

export type User = z.infer<typeof UserSchema>;
