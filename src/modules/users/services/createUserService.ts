import { StatusCodes } from "http-status-codes";
import { ApiError } from "src/common/ApiError";
import { usersCollection } from "src/database/collections/usersCollection";
import { createToken } from "src/helpers/jwt";
import { findUserService } from ".";
import { UserCreateInput, UserCreateOutputSchema } from "../schemas";

export async function createUserService(input: UserCreateInput) {
	const collection = await usersCollection();

	const user = await findUserService(input);

	if (user) {
		throw new ApiError("User already exists", StatusCodes.CONFLICT);
	}

	const result = await collection.insertOne(input);

	const token = await createToken({
		_id: result.insertedId.toHexString(),
		email: input.email,
		username: input.username,
	});

	const json = UserCreateOutputSchema.parse({ token });

	return json;
}
