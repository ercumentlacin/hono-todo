import { OpenAPIHono } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { ErrorSchema } from "src/common/schema";
import { formatZodErrors } from "src/helpers/formatZodErrors";
import { userCreateRoute, userListRoute } from "./routes";
import { createUserService, getUserListService } from "./services";

export const userApp = new OpenAPIHono({
	defaultHook: (result, c) => {
		if (!result.success) {
			const json = ErrorSchema.parse({
				message: formatZodErrors(result),
			});
			return c.json(json, json.code);
		}
	},
});

userApp.openapi(userCreateRoute, async (c) => {
	const { username, password, email, todos } = c.req.valid("json");
	const json = await createUserService({ username, password, email, todos });

	return c.json(json, StatusCodes.CREATED);
});
userApp.openapi(userListRoute, async (c) => {
	const q = c.req.valid("query");
	const limit = parseInt(q.limit, 10);
	const skip = parseInt(q.skip, 10);
	const json = await getUserListService({ limit, skip });

	return c.json(json, StatusCodes.CREATED);
});
