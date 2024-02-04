import { StatusCodes } from "http-status-codes";
import { sign, verify } from "jsonwebtoken";
import { ApiError } from "src/common/ApiError";
import { env } from "src/constants/env";
import { prisma } from "src/libs/prisma";

interface Payload {
	id: number;
	email: string;
	username: string;
}

export async function createToken(payload: Payload) {
	const token = sign(payload, env.JWT_SECRET);
	return token;
}

export const verifyToken = async (
	token: string | undefined,
): Promise<unknown> => {
	if (!token) {
		throw new ApiError("Missing token", StatusCodes.UNAUTHORIZED);
	}

	const tokenToVerify = token.replace("Bearer ", "");
	const verifyPayload = verify(tokenToVerify, env.JWT_SECRET) as Payload;

	if (!verifyPayload?.id) {
		throw new ApiError("Invalid token", StatusCodes.UNAUTHORIZED);
	}

	return verifyPayload;
};

export const generateAccessToken = (userId: number) => {
	return sign({ userId }, env.JWT_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = async (userId: number) => {
	const refreshToken = sign({ userId }, env.REFRESH_TOKEN_SECRET, {
		expiresIn: "7d",
	});
	await prisma.refreshToken.create({
		data: {
			token: refreshToken,
			userId,
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
		},
	});

	return refreshToken;
};
