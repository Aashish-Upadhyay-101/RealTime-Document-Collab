import BaseError from "./BaseError";
import { STATUS_CODE } from "./errorEnum";

export class Forbidden extends BaseError {
  statusCode = STATUS_CODE.FORBIDDEN;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, Forbidden.prototype);
  }

  serializeErrorMessage() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
