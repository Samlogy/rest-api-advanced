import { Request, Response, NextFunction } from "express";
import { decryptData } from "../utils/encryption.utils";

export default function deserializeData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    req.method !== "GET" &&
    req.body &&
    Object.keys(req.body).length === 1 &&
    typeof req.body?.data !== "string"
  ) {
    try {
      // decrypt
      req.body = decryptData(req.body);
      return next();
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to deserialize data" });
    }
  } else return next();
}
