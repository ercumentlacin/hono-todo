import { Document, FindOptions } from "mongodb";
import { usersCollection } from "src/database/collections/usersCollection";

export async function getUserListService(
	options?: FindOptions<Document> | undefined,
) {
	const collection = await usersCollection();
	const user = await collection.find({}, options).toArray();

	return user;
}
