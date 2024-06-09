import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET_KEY } from "../src/config";

export interface customJwtPayload extends JwtPayload {
  userId: string;
}

export const generateToken = (payload: customJwtPayload): string => {
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
};
