abstract class BaseError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, BaseError.prototype);
  }

  abstract serializeErrorMessage(): {
    message: string;
    fields?: string;
  }[];
}

export default BaseError;
