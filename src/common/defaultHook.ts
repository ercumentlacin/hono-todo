import { Context, Env } from "hono";
import { formatZodErrors } from "src/helpers/formatZodErrors";
import { ZodError } from "zod";
import { ErrorSchema } from "./schema";

type Result =
	| {
			success: false;
			error: ZodError<unknown>;
	  }
	| {
			success: true;
			data: unknown;
	  };

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
// biome-ignore lint/complexity/noBannedTypes: <explanation>
type C = Context<Env, any, {}>;

export const defaultHook = (result: Result, c: C) => {
	if (!result.success) {
		const json = ErrorSchema.parse({
			message: formatZodErrors(result),
		});
		return c.json(json, json.code);
	}
};
