import { StatusCodes } from "http-status-codes";
import { ObjectId } from "mongodb";
import { ApiError } from "src/common/ApiError";
import { usersCollection } from "src/database/collections/usersCollection";
import { User } from "../schemas";

export async function updateUserByIdService({
	id,
	input,
}: { id: string; input: User }) {
	const collection = await usersCollection();
	const updatedUser = await collection.findOneAndUpdate(
		{
			_id: new ObjectId(id),
		},
		{
			$set: input,
		},
	);

	if (!updatedUser) {
		throw new ApiError("User not found", StatusCodes.NOT_FOUND);
	}

	return updatedUser;
}
