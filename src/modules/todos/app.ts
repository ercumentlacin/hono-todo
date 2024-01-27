import { OpenAPIHono } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { ErrorSchema } from "src/common/schema";
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

todosApp.openapi(todoCreateRoute, (c) => {
	const { description, done, title } = c.req.valid("json");
	const json = TodoOutputSchema.parse({ title, description, done, id: "1" });
	return c.json(json, StatusCodes.CREATED);
});
