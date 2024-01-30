import { OpenAPIHono } from "@hono/zod-openapi";
import { bearerAuth } from "hono/bearer-auth";
import { jwt } from "hono/jwt";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "src/common/ApiError";
import { ErrorSchema } from "src/common/schema";
import { env } from "src/constants/env";
import { formatZodErrors } from "src/helpers/formatZodErrors";
import { userCreateRoute, userListRoute, userUpdateByIdRoute } from "./routes";
import { createUserService, getUserListService } from "./services";
import { updateUserByIdService } from "./services/updateUserByIdService";

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

userApp.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
	type: "http",
	scheme: "bearer",
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

// userApp.use(userUpdateByIdRoute.path, async (c, next) => {
// 	const auth = jwt({
// 		secret: env.JWT_SECRET,
// 	});
// 	return await auth(c, next);
// });

userApp.openapi(userUpdateByIdRoute, async (c) => {
	console.log(c.req.raw.headers);

	const { id } = c.req.valid("param");
	console.log("🚀 ~ userApp.openapi ~ id:", id);
	const input = c.req.valid("json");
	console.log("🚀 ~ userApp.openapi ~ input:", input);
	const header = c.req.valid("header");
	console.log("🚀 ~ userApp.openapi ~ header:", header);

	// const json = await updateUserByIdService({ id, input });
	const mockJson = {
		_id: "60f0b0b0e6b3f3b4e8f7b3b4",
		username: "test",
		email: "t@t.com",
		todos: [],
	};

	return c.json(mockJson, StatusCodes.OK);
});
