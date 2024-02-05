import { Prisma } from "@prisma/client";
import { prisma } from "src/libs/prisma";
import { TodoCreateOutputSchema } from "../schemas";

export async function todoCreateService(
	input: Omit<Prisma.TodoCreateInput, "user">,
	userId: number,
) {
	const newTdo = await prisma.todo.create({
		data: {
			...input,
			user: {
				connect: {
					id: userId,
				},
			},
		},
	});

	await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			todos: {
				connect: {
					id: newTdo.id,
				},
			},
		},
	});

	await prisma.$disconnect();

	const json = TodoCreateOutputSchema.parse({
		...input,
		...newTdo,
	});
	return json;
}
