import { z } from "@hono/zod-openapi";

export const TodosOutputSchema = z
	.object({
		title: z
			.string({ required_error: "Title is required" })
			.min(1, "Title must be at least 1 character long")
			.openapi({
				example: "My todo",
			}),
		description: z.string().optional().default("").openapi({
			example: "This is my todo",
		}),
		done: z.boolean().optional().default(false).openapi({
			example: false,
		}),
		id: z.number().openapi({
			example: 1,
		}),
		user: z.object({
			id: z.number(),
			email: z.string(),
			username: z.string(),
		}),
	})
	.array();

export type TodosOutputInput = z.infer<typeof TodosOutputSchema>;
