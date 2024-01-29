import { z } from "@hono/zod-openapi";
import { ObjectId } from "mongodb";
import { UserCreateInputSchema } from ".";

export const UserSchema = z
	.object({})
	.merge(UserCreateInputSchema)
	.merge(
		z.object({
			_id: z.union([z.string(), z.instanceof(ObjectId)]),
		}),
	);

export type User = z.infer<typeof UserSchema>;
