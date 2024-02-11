import { OpenAPIHono } from "@hono/zod-openapi";
import { getCookie } from "hono/cookie";
import { StatusCodes } from "http-status-codes";
import { defaultHook } from "src/common/defaultHook";
import { ErrorSchema } from "src/common/schema";
import { verifyToken } from "src/helpers/jwt";
import {
	todoByIdRoute,
	todoCreateRoute,
	todoDeleteByIdRoute,
	todoListRoute,
	todoUpdateByIdRoute,
} from "./routes";
import {
	todoByIdService,
	todoCreateService,
	todoDeleteByIdService,
	todoListService,
	todoUpdateByIdService,
} from "./services";

export const todosApp = new OpenAPIHono({
	defaultHook,
});

todosApp.openapi(todoCreateRoute, async (c) => {
	const token = getCookie(c, "token");
	let userId: number | undefined;

	const decodedPayload = await verifyToken(token);
	if (
		typeof decodedPayload === "object" &&
		decodedPayload !== null &&
		"userId" in decodedPayload &&
		typeof decodedPayload.userId === "number"
	) {
		userId = decodedPayload.userId;
	}

	if (!userId) {
		return c.json(
			ErrorSchema.parse({
				message: "Unauthorized",
			}),
			StatusCodes.UNAUTHORIZED,
		);
	}

	const { description, done, title } = c.req.valid("json");
	const json = await todoCreateService({ description, done, title }, userId);

	return c.json(json, StatusCodes.CREATED);
});

todosApp.openapi(todoListRoute, async (c) => {
	const q = c.req.valid("query");
	const limit = parseInt(q.limit, 10);
	const skip = parseInt(q.skip, 10);
	const json = await todoListService({ limit, skip });
	return c.json(json, StatusCodes.OK);
});

todosApp.openapi(todoByIdRoute, async (c) => {
	const { id } = c.req.valid("param");

	const json = await todoByIdService({
		id: parseInt(id, 10),
	});
	return c.json(json, StatusCodes.OK);
});

todosApp.openapi(todoUpdateByIdRoute, async (c) => {
	const { id } = c.req.valid("param");
	const data = c.req.valid("json");

	const json = await todoUpdateByIdService({
		id: parseInt(id, 10),
		data,
	});
	return c.json(json, StatusCodes.OK);
});

todosApp.openapi(todoDeleteByIdRoute, async (c) => {
	const { id } = c.req.valid("param");

	await todoDeleteByIdService({
		id: parseInt(id, 10),
	});

	return c.json(
		{
			success: true as const,
		},
		StatusCodes.OK,
	);
});
