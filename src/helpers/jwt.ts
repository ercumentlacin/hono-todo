import { decode, sign, verify } from "hono/jwt";
import { env } from "src/constants/env";
import { User } from "src/modules/users/schemas/userSchema";

export async function createToken(
	payload: Pick<User, "_id" | "email" | "username">,
) {
	const token = await sign(payload, env.JWT_SECRET);
	return token;
}
