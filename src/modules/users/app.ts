import { OpenAPIHono, z } from "@hono/zod-openapi";
import { StatusCodes } from "http-status-codes";
import { ErrorSchema } from "src/common/schema";
import { formatZodErrors } from "src/helpers/formatZodErrors";
import { verifyToken } from "src/helpers/jwt";
import { userListRoute, userRoute, userUpdateByIdRoute } from "./routes";
import { getUserById, getUserListService } from "./services";
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

userApp.openapi(userListRoute, async (c) => {
	const q = c.req.valid("query");
	const limit = parseInt(q.limit, 10);
	const skip = parseInt(q.skip, 10);
	const json = await getUserListService({ limit, skip });

	return c.json(json, StatusCodes.OK);
});

userApp.use(userUpdateByIdRoute.path, async (c, next) => {
	const authToken = c.req.header("authorization");

	await verifyToken(authToken);

	c.header("authorization", authToken);
	return next();
});

userApp.openapi(userUpdateByIdRoute, async (c) => {
	const { id } = c.req.valid("param");
	const data = c.req.valid("json");

	const json = await updateUserByIdService({ data, id: parseInt(id, 10) });

	const result = z.object({}).passthrough().parse(json);

	return c.json(result, StatusCodes.OK);
});

userApp.openapi(userRoute, async (c) => {
	const { id } = c.req.valid("param");

	const json = await getUserById(parseInt(id, 10));

	return c.json(json, StatusCodes.OK);
});
