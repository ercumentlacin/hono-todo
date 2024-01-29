import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { ApiError } from "./common/ApiError";
import { ErrorSchema } from "./common/schema";
import { todosApp } from "./modules/todos/app";
import { userApp } from "./modules/users/app";

const app = new OpenAPIHono();

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

app.onError((err, c) => {
	console.log("🚀 ~ app.onError ~ err:", err);
	if (err instanceof ApiError) {
		const json = ErrorSchema.parse(err);
		console.log("🚀 ~ app.onError ~ json:", json);
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
