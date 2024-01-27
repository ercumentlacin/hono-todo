import { Db } from "mongodb";
import { CreateTodoInput } from "./schema";

export async function createTodo(
	input: CreateTodoInput,
	db: Db,
	setStatus: (code: number) => void,
) {
	const todosCollection = db.collection<CreateTodoInput>("todos");
	const result = await todosCollection?.insertOne({
		done: false,
		title: input.title,
		description: input.description,
	});
	setStatus(201);
	return { id: result.insertedId };
}
