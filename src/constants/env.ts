import "dotenv/config";
import z from "zod";

const envSchema = z
	.object({
		DB_NAME: z.string({
			required_error: "Missing DB_NAME env var",
		}),
		DB_USER: z.string({
			required_error: "Missing DB_USER env var",
		}),
		DB_PASS: z.string({
			required_error: "Missing DB_PASS env var",
		}),
		JWT_SECRET: z.string({
			required_error: "Missing JWT_SECRET env var",
		}),
		ACCESS_TOKEN_SECRET: z.string({
			required_error: "Missing ACCESS_TOKEN_SECRET env var",
		}),
		REFRESH_TOKEN_SECRET: z.string({
			required_error: "Missing REFRESH_TOKEN_SECRET env var",
		}),
	})
	.passthrough();

export const env = envSchema.parse(process.env);
