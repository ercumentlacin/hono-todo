import { prisma } from "src/libs/prisma";
import { UserSchema } from "../schemas";

export async function getUserListService(options?: {
	skip?: number;
	limit?: number;
}) {
	const user = await prisma.user.findMany({
		include: {
			todos: true,
		},
		skip: options?.skip,
		take: options?.limit,
	});

	return UserSchema.omit({ password: true }).array().parse(user);
}
