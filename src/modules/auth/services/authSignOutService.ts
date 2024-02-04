import { StatusCodes } from "http-status-codes";
import { ApiError } from "src/common/ApiError";
import { prisma } from "src/libs/prisma";

export const authSignOutService = async (refreshToken: string) => {
	if (!refreshToken) {
		throw new ApiError("Refresh token is required", StatusCodes.BAD_REQUEST);
	}

	await prisma.refreshToken.delete({
		where: { token: refreshToken },
	});

	return {
		success: true,
		message: "User signed out successfully",
	};
};
