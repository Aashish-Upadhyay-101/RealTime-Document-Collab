import BaseError from "./BaseError";
import { STATUS_CODE } from "./errorEnum";

export class NotFoundError extends BaseError {
  statusCode = STATUS_CODE.NOT_FOUND;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrorMessage() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
