import { Document, FindOptions } from "mongodb";
import { todosCollection } from "src/database/collections";
import {
	TodoCreateInput,
	TodoCreateOutputSchema,
	TodosOutputSchema,
} from "./schemas";

export async function createTodo(input: TodoCreateInput) {
	const collection = await todosCollection();
	const result = await collection.insertOne(input);
	const json = TodoCreateOutputSchema.parse({
		...input,
		_id: result.insertedId.toHexString(),
	});
	return json;
}

export async function listTodos(options?: FindOptions<Document> | undefined) {
	const collection = await todosCollection();
	const result = await collection.find({}, options).toArray();
	const json = TodosOutputSchema.parse(result);
	return json;
}
