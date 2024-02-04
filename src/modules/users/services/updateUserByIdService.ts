import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "src/common/ApiError";
import { prisma } from "src/libs/prisma";

export async function updateUserByIdService({
	id,
	data,
}: { id: number; data: Prisma.UserUpdateArgs["data"] }) {
	const updatedUser = await prisma.user.update({
		where: {
			id,
		},
		data,
	});

	if (!updatedUser) {
		throw new ApiError("User not found", StatusCodes.NOT_FOUND);
	}

	return updatedUser;
}
