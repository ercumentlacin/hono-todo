import { z } from "@hono/zod-openapi";

export const todoByIdOutputSchema = z.object({
	id: z.number().openapi({ description: "Todo id", example: 1 }),
	title: z.string().openapi({ description: "Todo title", example: "Buy milk" }),
	description: z
		.string()
		.openapi({
			description: "Todo description",
			example: "Buy milk from the store",
		}),
	done: z.boolean().openapi({ description: "Todo done", example: false }),
	userId: z.number().openapi({ description: "User id", example: 1 }),
});
