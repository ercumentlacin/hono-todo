import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { todosApp } from "./modules/todos/app";

const app = new OpenAPIHono();

app.route("api/v1/todos", todosApp);

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

const port = 8090;
console.log(`Server is running on port ${port}`);

serve({
	fetch: app.fetch,
	port,
});
