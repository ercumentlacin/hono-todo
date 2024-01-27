import { ZodError } from "zod";

export function formatZodErrors(result: {
	success: false;
	error: ZodError<unknown>;
}) {
	const firstError = result.error.issues[0];
	if (firstError) {
		return firstError.message;
	}
	return "Unknown error";
}
