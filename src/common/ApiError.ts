export class ApiError extends Error {
	public status: number;
	public code: number;
	public stack?: string;
	public name = "ApiError";

	constructor(message: string, status: number) {
		super(message);
		this.status = status;
		this.code = status;

		Object.setPrototypeOf(this, ApiError.prototype);
		Error.captureStackTrace(this, ApiError);
	}
}
