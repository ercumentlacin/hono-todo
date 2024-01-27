import fastifySwagger from "@fastify/swagger";
import fastifyUi from "@fastify/swagger-ui";
import fastify, { errorCodes } from "fastify";

export async function createApp() {
	const app = fastify({
		logger: true,
	});

	await app.register(fastifySwagger);

	await app.register(fastifyUi, {
		routePrefix: "/documentation",
		uiConfig: {
			docExpansion: "full",
			deepLinking: false,
		},
		uiHooks: {
			onRequest: (request, reply, next) => {
				next();
			},
			preHandler: (request, reply, next) => {
				next();
			},
		},
		staticCSP: true,
		transformStaticCSP: (header) => header,
		transformSpecification: (swaggerObject, request, reply) => {
			return swaggerObject;
		},
		transformSpecificationClone: true,
	});

	app.setErrorHandler(function (error, request, reply) {
		console.log("##########");
		console.log(error);
		console.log("##########");
		if (error instanceof errorCodes.FST_ERR_BAD_STATUS_CODE) {
			// Log error
			this.log.error(error);
			// Send error response
			reply.status(500).send({ ok: false });
		} else {
			// fastify will use parent error handler to handle this
			reply.send(error);
		}
	});

	return app;
}
