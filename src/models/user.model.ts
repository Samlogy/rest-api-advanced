import { Schema, model, Document } from "mongoose";
import { compare, hash } from "bcryptjs";

export interface UserDocument extends Document {
  email: string;
  password: string;
  role: string;
  createdAt?: any;
  comparePasswords?: any;
}

const userSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "moderator" },
  createdAt: { type: Date, default: Date.now() },
});

userSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await hash(this.password, 10);
    this.password = salt;
    next();
  } catch (err: any) {
    next(err);
  }
});

userSchema.methods.comparePasswords = async function (password: string) {
  return compare(password, this.password);
};

export const UserModel = model<UserDocument>("User", userSchema);
