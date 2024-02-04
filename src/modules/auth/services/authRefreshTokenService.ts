import { StatusCodes } from "http-status-codes";
import { verify } from "jsonwebtoken";
import { ApiError } from "src/common/ApiError";
import { env } from "src/constants/env";
import { generateAccessToken } from "src/helpers/jwt";
import { prisma } from "src/libs/prisma";

export const authRefreshTokenService = async (refreshToken: string) => {
	if (!refreshToken) {
		throw new ApiError("Refresh token is required", StatusCodes.BAD_REQUEST);
	}

	const savedToken = await prisma.refreshToken.findUnique({
		where: { token: refreshToken },
	});

	if (!savedToken || savedToken.expiresAt < new Date()) {
		throw new ApiError("Token expired or invalid", StatusCodes.UNAUTHORIZED);
	}

	const verified = verify(refreshToken, env.REFRESH_TOKEN_SECRET);

	if (
		!verified ||
		typeof verified !== "object" ||
		!("userId" in verified) ||
		typeof verified.userId !== "number"
	) {
		throw new ApiError("Invalid refresh token", StatusCodes.UNAUTHORIZED);
	}

	const user = await prisma.user.findUnique({ where: { id: verified.userId } });

	if (!user) {
		throw new ApiError("User not found", StatusCodes.UNAUTHORIZED);
	}

	const accessToken = generateAccessToken(user.id);

	return { accessToken };
};
