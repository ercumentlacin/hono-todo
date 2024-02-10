import { z } from "@hono/zod-openapi";

import { TodosOutputSchema } from "..";

export const todoUpdateByIdInputSchema = TodosOutputSchema.element
	.partial()
	.omit({ id: true, user: true });

export type TodoUpdateByIdInput = z.infer<typeof todoUpdateByIdInputSchema>;
