import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "src/common/ApiError";
import { prisma } from "src/libs/prisma";
import { findUserService } from "src/modules/users/services";
import { authSignUpOutputSchema } from "../schemas";

export async function authSignUpService(input: Prisma.UserCreateInput) {
	const user = await findUserService({
		email: input.email,
		username: input.username,
	});

	const hashedPassword = await bcrypt.hash(input.password, 10);

	if (user) {
		throw new ApiError("User already exists", StatusCodes.CONFLICT);
	}

	const result = await prisma.user.create({
		data: {
			...input,
			password: hashedPassword,
		},
	});
	console.log("🚀 ~ authSignUpService ~ result:", result);

	const json = authSignUpOutputSchema.parse(result);

	return json;
}
