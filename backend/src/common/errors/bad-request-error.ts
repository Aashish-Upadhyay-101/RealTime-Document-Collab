import BaseError from "./BaseError";
import { STATUS_CODE } from "./errorEnum";

export class BadRequestError extends BaseError {
  statusCode = STATUS_CODE.BAD_REQUEST;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrorMessage() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
