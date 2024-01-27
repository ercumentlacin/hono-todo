import { z } from "@hono/zod-openapi";

export const TodoCreateInputSchema = z.object({
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
});

export const TodoOutputSchema = TodoCreateInputSchema.merge(
	z.object({
		id: z.string().openapi({
			example: "1212121",
		}),
	}),
);

export const TodosOutputSchema = z.array(TodoOutputSchema);

export type CreateTodoInput = z.infer<typeof TodoCreateInputSchema>;
