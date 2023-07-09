import jwt, { JwtPayload } from "jsonwebtoken";
import { promisify } from "util";

interface IToken {
  token: string;
  type: string;
}

export class Token {
  private static generateAccessAuthToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN_SECRET as string, {
      expiresIn: 1000 * 60,
    });
  };

  private static generateRefreshAuthToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_TOKEN_SECRET as string, {
      expiresIn: 1000 * 60 * 60 * 24 * 30,
    });
  };

  public static generateAuthToken = (id: string) => {
    const accessToken = this.generateAccessAuthToken(id);
    const refreshToken = this.generateRefreshAuthToken(id);

    return {
      access: accessToken,
      refresh: refreshToken,
    };
  };

  public static generateNewAccessTokenWithRefreshToken = (token: string) => {
    const jwtSecret = process.env.JWT_REFRESH_TOKEN_SECRET as string;
    const decodedData = jwt.verify(token, jwtSecret) as JwtPayload;
    const { id: userId } = decodedData;

    const newAccessToken = this.generateAccessAuthToken(userId);
    return newAccessToken;
  };
}
