import "dotenv/config";
import z from "zod";

const envSchema = z
	.object({
		MONGODB_URL: z.string({
			required_error: "Missing MONGODB_URL env var",
		}),
		DB_NAME: z.string({
			required_error: "Missing DB_NAME env var",
		}),
		DB_USER: z.string({
			required_error: "Missing DB_USER env var",
		}),
		DB_PASS: z.string({
			required_error: "Missing DB_PASS env var",
		}),
	})
	.passthrough();

export const env = envSchema.parse(process.env);
