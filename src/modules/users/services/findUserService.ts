import { Prisma } from "@prisma/client";
import { prisma } from "src/libs/prisma";

type AAAA = Parameters<typeof prisma.user.findFirst>[0];

export async function findUserService(payload: Prisma.UserWhereInput) {
	const user = await prisma.user.findFirst({
		where: {
			OR: [{ email: payload.email }, { username: payload.username }],
		},
		include: {
			todos: true,
			refreshTokens: true,
		},
	});

	return user;
}
