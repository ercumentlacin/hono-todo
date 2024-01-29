import { z } from "@hono/zod-openapi";
import { ObjectId } from "mongodb";

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

export const TodoCreateOutputSchema = TodoCreateInputSchema.merge(
	z.object({
		_id: z
			.union([z.string(), z.instanceof(ObjectId)])
			.transform((v) => new ObjectId(v).toHexString())
			.openapi({
				example: new ObjectId().toHexString(),
			}),
	}),
);

export type TodoCreateInput = z.infer<typeof TodoCreateInputSchema>;
