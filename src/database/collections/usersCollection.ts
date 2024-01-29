import { UserCreateInput } from "src/modules/users/schemas";
import { getDatabase } from "..";

export const usersCollection = async () => {
	const db = await getDatabase();
	return db.collection<UserCreateInput>("users");
};
