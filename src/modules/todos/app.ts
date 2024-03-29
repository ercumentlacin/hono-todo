import { OpenAPIHono } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { ErrorSchema } from "src/common/schema";
import { formatZodErrors } from "src/helpers/formatZodErrors";
import { todoCreateRoute, todoListRoute } from "./routes";
import { createTodo, listTodos } from "./services";

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
	const json = await createTodo({ description, done, title });

	return c.json(json, StatusCodes.CREATED);
});

todosApp.openapi(todoListRoute, async (c) => {
	const q = c.req.valid("query");
	const limit = parseInt(q.limit, 10);
	const skip = parseInt(q.skip, 10);
	const json = await listTodos({ limit, skip });
	return c.json(json, StatusCodes.OK);
});
