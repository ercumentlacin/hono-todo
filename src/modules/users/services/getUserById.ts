import { StatusCodes } from "http-status-codes";
import { ApiError } from "src/common/ApiError";
import { prisma } from "src/libs/prisma";
import { UserSchema } from "../schemas";

export async function getUserById(id: number) {
	const user = await prisma.user.findUnique({
		where: {
			id: id,
		},
		include: {
			todos: true,
		},
	});

	if (!user) {
		throw new ApiError("User not found", StatusCodes.NOT_FOUND);
	}

	return UserSchema.omit({ password: true }).parse(user);
}
