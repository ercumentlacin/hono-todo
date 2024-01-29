import { usersCollection } from "src/database/collections/usersCollection";
import { UserCreateInput } from "../schemas";

export async function findUserService(payload: UserCreateInput) {
	const collection = await usersCollection();
	const user = await collection.findOne({
		$or: [{ email: payload.email }, { username: payload.username }],
	});

	return user;
}
