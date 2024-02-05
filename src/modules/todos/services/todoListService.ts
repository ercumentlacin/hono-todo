import { prisma } from "src/libs/prisma";
import { TodosOutputSchema } from "../schemas";

export async function todoListService(options?: {
	skip?: number;
	limit?: number;
}) {
	const result = await prisma.todo.findMany({
		skip: options?.skip,
		take: options?.limit,
	});
	const json = TodosOutputSchema.parse(result);
	return json;
}
