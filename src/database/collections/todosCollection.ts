import { TodoCreateInput } from "src/modules/todos/schemas";
import { getDatabase } from "..";

export const todosCollection = async () => {
	const db = await getDatabase();
	return db.collection<TodoCreateInput>("todos");
};
