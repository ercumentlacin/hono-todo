import { StatusCodes } from "http-status-codes";
import { ApiError } from "src/common/ApiError";
import { prisma } from "src/libs/prisma";
import { TodoUpdateByIdInput } from "../schemas";

export const todoUpdateByIdService = async ({
	id,
	data,
}: {
	id: number;
	data: TodoUpdateByIdInput;
}) => {
	const todo = await prisma.todo.update({
		where: {
			id,
		},
		data,
	});

	if (!todo) {
		throw new ApiError("Todo not found", StatusCodes.NOT_FOUND);
	}

	return todo;
};
