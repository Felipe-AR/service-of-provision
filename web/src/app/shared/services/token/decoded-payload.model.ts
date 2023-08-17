import { Role } from "../../models";

export class DecodedPayload {
  sub: string;
  userId: string;
  email: string;
  role: Role
  iat: number;
  exp: number;
}