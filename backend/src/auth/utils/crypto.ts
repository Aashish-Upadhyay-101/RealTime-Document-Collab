import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const asyncScrypt = promisify(scrypt);

export class Password {
  static async hashPassword(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buffer = (await asyncScrypt(password, salt, 64)) as Buffer;
    return `${buffer.toString("hex")}.${salt}`;
  }

  // TODO: implement this while making login controller
  static async verifyPassword(password: string, hashedPassword: string) {
    return false;
  }
}
