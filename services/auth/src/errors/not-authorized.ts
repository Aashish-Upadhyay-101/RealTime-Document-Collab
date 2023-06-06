import BaseError from "./BaseError";
import { STATUS_CODE } from "./errorEnum";

export class NotAuthorized extends BaseError {
  statusCode = STATUS_CODE.UNAUTHORIZED;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, NotAuthorized.prototype);
  }

  serializeErrorMessage() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
