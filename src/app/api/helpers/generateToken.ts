import Jwt from "jsonwebtoken";

export default function generateToken(id: string) {
  try {
    const token = Jwt.sign(
      {
        id,
      },
      process?.env?.JWT_SECRET!,
      {
        expiresIn: "1w",
      }
    );

    return token;
  } catch (error) {
    throw {
      code: "TOKEN_GENERATE_FAILED",
      message: "failed to generate token",
    };
  }
}
