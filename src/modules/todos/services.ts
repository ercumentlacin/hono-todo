import { Db } from "mongodb";
import { TodoCreateInput } from "./schema";

export async function createTodo(
	input: TodoCreateInput,
	db: Db,
	setStatus: (code: number) => void,
) {
	const todosCollection = db.collection<TodoCreateInput>("todos");
	const result = await todosCollection?.insertOne({
		done: false,
		title: input.title,
		description: input.description,
	});
	setStatus(201);
	return { id: result.insertedId };
}
