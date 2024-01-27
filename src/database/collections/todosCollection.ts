import { TodoCreateInput } from "src/modules/todos/schema";
import { getDatabase } from "..";

export const todosCollection = async () => {
	const db = await getDatabase();
	return db.collection<TodoCreateInput>("todos");
};
