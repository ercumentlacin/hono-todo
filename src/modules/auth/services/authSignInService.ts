import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "src/common/ApiError";
import { generateAccessToken, generateRefreshToken } from "src/helpers/jwt";
import { prisma } from "src/libs/prisma";

export async function authSignInService(email: string, password: string) {
	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (!user || !(await bcrypt.compare(password, user.password))) {
		throw new ApiError("Invalid email or password", StatusCodes.UNAUTHORIZED);
	}

	const accessToken = generateAccessToken(user.id);
	const refreshToken = await generateRefreshToken(user.id);

	return { accessToken, refreshToken };
}
