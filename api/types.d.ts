import {Model} from "mongoose";

export interface UserTypes {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string | null;
  googleID: string;
}

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserTypes, {}, UserMethods>;