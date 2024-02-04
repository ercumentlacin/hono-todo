import { OpenAPIHono } from "@hono/zod-openapi";
import { deleteCookie, setCookie } from "hono/cookie";
import { StatusCodes } from "http-status-codes";
import { defaultHook } from "src/common/defaultHook";
import {
	authRefreshTokenRoute,
	authSignInRoute,
	authSignOutRoute,
	authSignUpRoute,
} from "./routes";
import {
	authRefreshTokenService,
	authSignInService,
	authSignOutService,
	authSignUpService,
} from "./services";

export const authApp = new OpenAPIHono({
	defaultHook,
});

authApp.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
	type: "http",
	scheme: "bearer",
});

authApp.openapi(authSignInRoute, async (c) => {
	const { email, password } = c.req.valid("json");
	const result = await authSignInService(email, password);
	const ONE_MINUTE = 60 * 1000;

	setCookie(c, "token", result.accessToken, {
		httpOnly: true,
		secure: true,
		sameSite: "Strict",
		expires: new Date(Date.now() + ONE_MINUTE * 15),
	});
	return c.json(result, StatusCodes.OK);
});

authApp.openapi(authSignUpRoute, async (c) => {
	const { email, password, username } = c.req.valid("json");
	const result = await authSignUpService({
		email,
		password,
		username,
	});

	return c.json(result, StatusCodes.CREATED);
});

authApp.openapi(authRefreshTokenRoute, async (c) => {
	const { token } = c.req.valid("json");
	const result = await authRefreshTokenService(token);
	return c.json(result, StatusCodes.OK);
});

authApp.openapi(authSignOutRoute, async (c) => {
	const { refreshToken } = c.req.valid("json");
	const result = await authSignOutService(refreshToken);

	deleteCookie(c, "token");
	return c.json(result, StatusCodes.OK);
});
