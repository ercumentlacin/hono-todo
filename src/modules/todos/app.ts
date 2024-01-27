import { OpenAPIHono } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { ErrorSchema } from "src/common/schema";
import { todosCollection } from "src/database/collections";
import { formatZodErrors } from "src/helpers/formatZodErrors";
import { todoCreateRoute } from "./routes";
import { TodoOutputSchema } from "./schema";

export const todosApp = new OpenAPIHono({
	defaultHook: (result, c) => {
		if (!result.success) {
			const json = ErrorSchema.parse({
				message: formatZodErrors(result),
			});
			return c.json(json, json.code);
		}
	},
});

todosApp.openapi(todoCreateRoute, async (c) => {
	const { description, done, title } = c.req.valid("json");
	const collection = await todosCollection();
	const result = await collection.insertOne({ description, done, title });
	const json = TodoOutputSchema.parse({
		title,
		description,
		done,
		id: result.insertedId.toHexString(),
	});
	return c.json(json, StatusCodes.CREATED);
});
