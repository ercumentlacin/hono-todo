import { z } from "@hono/zod-openapi";

const todoFromEnumSchema = z
	.union([
		z.enum(["x", "instagram", "medium", "youtube"]),
		z.string(),
		z.null(),
	])
	.optional()
	.default(null)
	.openapi({
		example: "x",
		description: "The source of the todo",
	});

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
	user: z.number().optional().openapi({
		example: 1,
	}),
	from: todoFromEnumSchema,
	tags: z
		.array(z.string())
		.optional()
		.default([])
		.openapi({
			example: ["work", "personal"],
		}),
});

export const TodoCreateOutputSchema = TodoCreateInputSchema.merge(
	z.object({
		id: z.number().openapi({
			example: 1,
		}),
	}),
);

export type TodoCreateInput = z.infer<typeof TodoCreateInputSchema>;
