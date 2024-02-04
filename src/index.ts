import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import "@total-typescript/ts-reset";
import { showRoutes } from "hono/dev";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { ApiError } from "./common/ApiError";
import { ErrorSchema } from "./common/schema";
import { authApp } from "./modules/auth/app";
import { todosApp } from "./modules/todos/app";
import { userApp } from "./modules/users/app";

const app = new OpenAPIHono();

app.use("*", logger());

app.route("api/v1/auth", authApp);
app.route("api/v1/todos", todosApp);
app.route("api/v1/users", userApp);

app.get("/", (c) => {
	return c.text("Hello Hono!");
});

app.get(
	"/ui",
	swaggerUI({
		url: "/doc",
	}),
);

app.doc("/doc", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "My API",
	},
});

app.notFound((c) => {
	return c.text("Not Found", 404);
});

app.onError((err, c) => {
	console.log("🚀 ~ app.onError ~ err:", err);
	if (err instanceof ApiError) {
		const json = ErrorSchema.parse(err);
		return c.json(json, json.code);
	}
	if (err instanceof HTTPException) {
		const json = ErrorSchema.parse({
			code: err.status,
			message: err.message,
		});
		return c.json(json, json.code);
	}
	return c.json(err, 500);
});

const port = 8090;
console.log(`Server is running on port ${port}`);

serve({
	fetch: app.fetch,
	port,
});

showRoutes(app);
