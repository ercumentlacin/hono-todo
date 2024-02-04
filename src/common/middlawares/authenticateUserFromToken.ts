import { StatusCodes } from "http-status-codes";
import { findUserService } from "src/modules/users/services";
import { ApiError } from "../ApiError";

export const authenticateUserFromToken = async ({
	userEmail,
	userToken,
}: {
	userEmail?: string;
	userToken?: string;
}) => {
	if (userEmail && userToken) {
		try {
			const user = await findUserService({ email: userEmail });
			if (user?.refreshTokens.find((token) => token.token === userToken)) {
				return user;
			}
			throw new ApiError("Unauthorized", StatusCodes.UNAUTHORIZED);
		} catch (e) {
			if (e instanceof ApiError) throw e;
			throw new ApiError("Unauthorized", StatusCodes.UNAUTHORIZED);
		}
	} else {
		throw new ApiError("Unauthorized", StatusCodes.UNAUTHORIZED);
	}
};
