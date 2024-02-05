import { StatusCodes } from "http-status-codes";
import { ApiError } from "src/common/ApiError";
import { prisma } from "src/libs/prisma";

export const todoByIdService = async ({
	id,
}: {
	id: number;
}) => {
	const todo = await prisma.todo.findUnique({
		where: {
			id,
		},
	});

	if (!todo) {
		throw new ApiError("Todo not found", StatusCodes.NOT_FOUND);
	}

	return todo;
};
